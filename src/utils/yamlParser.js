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
    // 如果解析失败，返回空对象而不是抛出异常
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

    // 优先检查是否是 YAML 键值对格式
    if (trimmedLine.includes(':') && isYamlKeyValue(trimmedLine)) {
      // 如果是有效的 YAML 键值对，跳过 Properties 检查
      continue;
    }

    // 检查是否包含 = 或 : 分隔符（用于 Properties 格式）
    if (trimmedLine.includes('=') || (trimmedLine.includes(':') && !trimmedLine.startsWith('- '))) {
      const parts = trimmedLine.split(/[=:]/);
      if (parts.length >= 2) {
        // 修复：确保值部分不是特殊符号
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();

        // 检查是否是有效的 properties 格式
        // 如果值包含特殊符号（如 /aa/），可能是普通文本而非 properties
        if (isValidKeyValue(key, value)) {
          hasPropertiesPattern = true;
          break;
        }
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
 * 检查是否是有效的键值对（用于排除 Properties 格式）
 */
function isValidKeyValue(key, value) {
  // 键不能为空或只包含特殊符号
  if (!key || key.length === 0) {
    return false;
  }

  // 如果键只包含特殊字符（如 /aa/、---、***），可能不是有效的 properties 键
  const specialCharsOnly = /^[^a-zA-Z0-9_][a-zA-Z0-9_]*$/.test(key);
  const containsSpecialSymbols = /[^a-zA-Z0-9_.\-/]/.test(key);

  // 如果键包含特殊符号或看起来像特殊标记，可能是普通文本
  // 注意：放宽限制，允许键包含 - 和 /（常见的配置文件命名）
  if (specialCharsOnly || key.startsWith('/') || key.startsWith('-')) {
    return false;
  }

  // 值也不能为空或只包含特殊符号
  if (value === '' || /^[^a-zA-Z0-9_][^a-zA-Z0-9_]*$/.test(value)) {
    return false;
  }

  return true;
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

  // 如果值部分为空，可能是合法的 YAML（值为 null）
  if (valuePart === '') {
    return true;
  }

  // 检查值是否以 YAML 特殊语法开头
  if (valuePart.startsWith('|') || valuePart.startsWith('>') ||
      valuePart.startsWith('-') || valuePart.startsWith('[') || valuePart.startsWith('{')) {
    return true;
  }

  // 检查值是否是有效的标量值
  if (isValidYamlScalar(valuePart)) {
    return true;
  }

  // 如果值以 / 开头（如路径），也认为是有效的 YAML
  // 因为 Properties 格式通常不会使用 / 开头的值
  if (valuePart.startsWith('/')) {
    return true;
  }

  return false;
}

/**
 * 检查是否是有效的 YAML 标量值
 */
function isValidYamlScalar(value) {
  // 空字符串不是有效的标量值
  if (!value || value === '') {
    return false;
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
