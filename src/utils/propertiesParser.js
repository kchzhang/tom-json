/**
 * 将 properties 格式转换为 JSON 对象
 * 支持的格式：
 * - key=value
 * - key: value
 * - key = value
 * - # 注释
 * - ! 注释
 */

export function propertiesToJson(propertiesStr) {
  const lines = propertiesStr.split('\n');
  const result = {};
  
  for (let line of lines) {
    // 移除首尾空白字符
    line = line.trim();
    
    // 跳过空行和注释
    if (!line || line.startsWith('#') || line.startsWith('!')) {
      continue;
    }
    
    // 查找分隔符（= 或 :）
    let separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      separatorIndex = line.indexOf(':');
    }
    
    if (separatorIndex !== -1) {
      const key = line.substring(0, separatorIndex).trim();
      let value = line.substring(separatorIndex + 1).trim();
      
      // 处理转义字符
      value = unescapeProperties(value);
      
      // 尝试转换为数字或布尔值
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      } else if (!isNaN(value) && value !== '') {
        value = Number(value);
      }
      
      // 支持嵌套键（如 user.name）
      setNestedValue(result, key, value);
    }
  }
  
  return result;
}

/**
 * 处理嵌套键，如 "user.name" -> { user: { name: value } }
 */
function setNestedValue(obj, key, value) {
  const keys = key.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
}

/**
 * 反转义 properties 值中的特殊字符
 */
function unescapeProperties(str) {
  // 处理转义字符：\n, \t, \r, \f, \\
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\f/g, '\f')
    .replace(/\\\\/g, '\\')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
}

/**
 * 检测字符串是否为 properties 格式
 */
export function isPropertiesFormat(str) {
  const trimmed = str.trim();
  
  // 尝试解析为 JSON
  try {
    JSON.parse(trimmed);
    return false; // 如果能解析为 JSON，则不是 properties 格式
  } catch (e) {
    // 继续检测是否为 properties 格式
  }
  
  // 检查是否包含 properties 特征
  const lines = trimmed.split('\n');
  let hasPropertiesPattern = false;
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith('!')) {
      continue;
    }
    
    // 检查是否包含 = 或 : 分隔符
    if (trimmedLine.includes('=') || trimmedLine.includes(':')) {
      const parts = trimmedLine.split(/[=:]/);
      if (parts.length >= 2) {
        hasPropertiesPattern = true;
        break;
      }
    }
  }
  
  return hasPropertiesPattern;
}
