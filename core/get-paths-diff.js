exports.getPathsDiff = (oldStructPaths, newStructPaths) => {
    const diff = [];
    let index = 0;
    for (const key in oldStructPaths) {
        if (!(key in newStructPaths)) {
            diff[index] = [key, oldStructPaths[key]];
            index++;
        }
    }
    return diff;
};
