exports.getEditedPaths = (oldStructPaths, newStructPaths) => {
    const diffs = [];
    for (const key in oldStructPaths) {
        if (newStructPaths.hasOwnProperty(key)) {
            if (typeof oldStructPaths[key] === 'object' &&
                typeof newStructPaths[key] === 'object' &&
                JSON.stringify(oldStructPaths[key]) === JSON.stringify(newStructPaths[key])) {
                continue;
            }
            if (oldStructPaths[key] !== newStructPaths[key]) {
                diffs.push([key, oldStructPaths[key], newStructPaths[key]]);
            }
        }
    }
    return diffs;
};
