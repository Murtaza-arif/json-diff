const generatePath = (isArray, currentPath, newPath, lodashLike) => {
    const prefix = lodashLike ? (isArray ? '[' : '.') : '/';
    const suffix = lodashLike ? (isArray ? ']' : '') : isArray ? '[]' : '';
    const path = currentPath !== '' ? `${currentPath}${prefix}${newPath}${suffix}` : `${lodashLike && isArray ? '[' : ''}${newPath}${suffix}`;
    return path;
};
const getStructPaths = (struct, isLodashLike = false, paths = {}, currentPath = '') => {
    for (const key of Object.keys(struct)) {
        const path = generatePath(Array.isArray(struct), currentPath, key, isLodashLike);
        if (typeof struct[key] === 'object' && struct[key] !== null) {
            if (Object.keys(struct[key]).length === 0) {
                paths[path] = struct[key];
            }
            getStructPaths(struct[key], isLodashLike, paths, path);
        }
        else {
            paths[path] = struct[key];
        }
    }
    return paths;
};
exports.getStructPaths = getStructPaths