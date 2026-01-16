// import useConfig from "src/store/useConfig";

export const isContentImage = (value) => {
    if (typeof value !== "string") return false;

    const isImageURL = /(https?:\/\/.*\.(?:png|jpg|gif))/i.test(value);
    const isBase64 = value.startsWith("data:image/") && value.includes("base64");

    return isImageURL || isBase64;
};

const calculateLines = (text) => {
    if (typeof text === "string") {
        return text;
    } else {
        return text.map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`).join("\n");
    }
};

const calculateWidthAndHeight = (str, single = false) => {
    if (!str) return { width: 45, height: 45 };

    const dummyElement = document.createElement("div");

    dummyElement.style.whiteSpace = single ? "nowrap" : "pre-wrap";
    dummyElement.innerHTML = str;
    dummyElement.style.fontSize = "12px";
    dummyElement.style.width = "fit-content";
    dummyElement.style.height = "fit-content";
    dummyElement.style.padding = "10px";
    dummyElement.style.fontWeight = "500";
    dummyElement.style.overflowWrap = "break-word";
    dummyElement.style.fontFamily = "monospace";
    document.body.appendChild(dummyElement);

    const clientRect = dummyElement.getBoundingClientRect();
    const width = clientRect.width + 4;
    const height = clientRect.height;

    document.body.removeChild(dummyElement);

    return { width, height };
};

const sizeCache = new Map();

// clear cache every 2 mins
setInterval(() => sizeCache.clear(), 120_000);

export const calculateNodeSize = (text, isParent = false) => {
    // const { imagePreviewEnabled } = useConfig.getState();
    // const isImage = isContentImage(text) && imagePreviewEnabled;
    const isImage = isContentImage(text);

    const cacheKey = [text, isParent].toString();

    // check cache if data already exists
    if (sizeCache.has(cacheKey)) {
        const size = sizeCache.get(cacheKey);

        if (size) return size;
    }

    const lines = calculateLines(text);
    const sizes = calculateWidthAndHeight(lines, typeof text === "string");

    if (isImage) {
        sizes.width = 80;
        sizes.height = 80;
    }

    if (isParent) sizes.width += 100;
    if (sizes.width > 700) sizes.width = 700;

    // 检测是否是空对象或空数组（文本以 {} 或 [] 结尾）
    const isEmptyContainer = typeof text === "string" &&
        (text.endsWith("{}") || text.endsWith("[]"));

    // 为空对象/数组设置更大的最小尺寸，防止互相遮挡
    if (isEmptyContainer) {
        sizes.width = Math.max(sizes.width, 180);
        sizes.height = Math.max(sizes.height, 45);
    }

    sizeCache.set(cacheKey, sizes);
    return sizes;
};
