/**
 * 将 YAML 格式转换为 JSON 对象
 * 支持 YAML 1.2 规范
 */

import yaml from 'js-yaml';

/**
 * 将 YAML 字符串转换为 JSON 对象
 */
export function yamlToJson(yamlStr) {
  try {
    const parsed = yaml.load(yamlStr);
    
    // 如果解析结果是 null 或 undefined，返回空对象
    if (parsed === null || parsed === undefined) {
      return {};
    }
    
    return parsed;
  } catch (error) {
    console.error('YAML 解析失败:', error);
    return {};
  }
}

/**
 * 检测字符串是否为 YAML 格式
 */
export function isYamlFormat(str) {
  const trimmed = str.trim();
  
  // 空字符串不是 YAML
  if (!trimmed) {
    return false;
  }
  
  // 尝试解析为 JSON
  try {
    JSON.parse(trimmed);
    return false; // 如果能解析为 JSON，则不是 YAML 格式
  } catch (e) {
    // 继续检测是否为 YAML 格式
  }
  
  // 尝试解析为 Properties 格式
  // 如果是 properties 格式，则不是 YAML
  const lines = trimmed.split('\n');
  let hasPropertiesPattern = false;
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith('!')) {
      continue;
    }
    
    // 检查是否包含 = 或 : 分隔符（但不是 YAML 的键: 值格式）
    if (trimmedLine.includes('=') || (trimmedLine.includes(':') && !trimmedLine.startsWith('- ') && !isYamlKeyValue(trimmedLine))) {
      const parts = trimmedLine.split(/[=:]/);
      if (parts.length >= 2) {
        hasPropertiesPattern = true;
        break;
      }
    }
  }
  
  if (hasPropertiesPattern) {
    return false;
  }
  
  // 尝试解析为 YAML
  try {
    yaml.load(trimmed);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 检查行是否符合 YAML 键值对格式
 * YAML 格式：key: value（有缩进）或 key: value（同一行）
 */
function isYamlKeyValue(line) {
  // YAML 键值对格式：key: value
  // 但排除 properties 的 key=value 格式
  const colonIndex = line.indexOf(':');
  
  // 必须有冒号
  if (colonIndex === -1) {
    return false;
  }
  
  const key = line.substring(0, colonIndex).trim();
  const valuePart = line.substring(colonIndex + 1).trim();
  
  // 键不能包含等号（排除 properties 格式）
  if (key.includes('=')) {
    return false;
  }
  
  // YAML 的键通常不以特定字符开头
  // 这里做一个简单的启发式判断
  // 如果值部分是有效的 YAML 值（字符串、数字、布尔值、null、列表等），则认为是 YAML
  if (valuePart === '' || valuePart.startsWith('|') || valuePart.startsWith('>') || 
      valuePart.startsWith('-') || valuePart.startsWith('[') || valuePart.startsWith('{')) {
    return true;
  }
  
  // 检查值是否是有效的标量值
  if (isValidYamlScalar(valuePart)) {
    return true;
  }
  
  return false;
}

/**
 * 检查是否是有效的 YAML 标量值
 */
function isValidYamlScalar(value) {
  if (!value) {
    return true; // 空值是有效的
  }
  
  // 数字
  if (!isNaN(value) && value !== '') {
    return true;
  }
  
  // 布尔值
  if (value === 'true' || value === 'false' || value === 'yes' || value === 'no') {
    return true;
  }
  
  // null
  if (value === 'null' || value === '~' || value === 'Null' || value === 'NULL') {
    return true;
  }
  
  // 字符串（任何其他值都是字符串）
  return true;
}
