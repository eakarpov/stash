export function clean(obj: any) {
    const res: any = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] !== null
                && obj[key] !== void 0
                && obj[key] !== ''
                && (!Array.isArray(obj[key]) || obj[key].length > 0)
            ) {
                res[key] = obj[key];
            }
        }
    }
    return res;
}
