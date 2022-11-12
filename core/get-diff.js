const { getEditedPaths } = require('./get-edited-paths')
const { getPathsDiff } = require('./get-paths-diff')
const { getStructPaths } = require('./get-struct-paths')

exports.getDiff = (oldStruct, newStruct, fieldMapping, primaryKeyMap, recordMapping) => {
    const delta = {
        added: [],
        removed: [],
        edited: []
    };
    let isLodashLike = true
    let oldStructPaths = getStructPaths(oldStruct, isLodashLike);
    oldStructPaths = replaceSourcePath(oldStructPaths, fieldMapping, primaryKeyMap, recordMapping)
    const newStructPaths = getStructPaths(newStruct, isLodashLike);

    // A-B
    delta.removed = getPathsDiff(oldStructPaths, newStructPaths);
    // B-A
    delta.added = getPathsDiff(newStructPaths, oldStructPaths);
    // a->b
    delta.edited = getEditedPaths(oldStructPaths, newStructPaths);
    return delta;
};

const replaceSourcePath = (paths, fieldMapping, primaryKeyMap, recordMapping) => {
    let pathMap = []
    for (let p = 0; p < Object.keys(paths).length; p++) {
        let key = Object.keys(paths)[p];
        const orginalPath = String(key)
        let value = paths[key]
        var re = /\[[0-9]\]/g
        let found = []
        let newKey = key.replace(re, "")
        while ((match = re.exec(key)) != null) {
            found.push({ match: match[0], index: match.index })
            if (match.index == 0) {
                newKey = newKey.slice(1)
            }
        }
        if (!fieldMapping[newKey]) {
            if (primaryKeyMap[newKey] && recordMapping[value]) {
                value = recordMapping[value]
            }
        } else {
            newKey = fieldMapping[newKey]
        }

        pathMap.push({
            orginalPath,
            found,
            newKey,
            value
        })
    }
    const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
    let newPathMap = {}
    for (let p = 0; p < pathMap.length; p++) {
        const path = pathMap[p];
        for (let f = 0; f < path.found.length; f++) {
            const found = path.found[f];
            if (found.index == 0) {
                path.newKey = insertAt(path.newKey, found.match + ".", found.index)
            } else {
                let np = path.newKey.split(".")
                np[f] = np[f]+found.match
                path.newKey = np.join(".")

            }
        }
        newPathMap[path.newKey] = path.value
    }
    return newPathMap
}