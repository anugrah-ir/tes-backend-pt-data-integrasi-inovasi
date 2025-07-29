const convertToNestedArray = async (items) => {
    const itemMap = new Map();
    const nestedArray = [];

    items.forEach(item => {
        itemMap.set(item.id, { ...item, children: [] });
    });

    itemMap.forEach(item => {
        if (item.parent_id === null) {
            nestedArray.push(item);
        } else {
            const parent = itemMap.get(item.parent_id);
            if (parent) {
                parent.children.push(item);
            }
        }
    });

    const sortByOrder = (arr) => {
        arr.sort((a, b) => a.order_number - b.order_number);
        arr.forEach(item => {
            if (item.children.length > 0) {
                sortByOrder(item.children);
            }
        });
    };

    sortByOrder(nestedArray);
    return nestedArray;
};

module.exports = convertToNestedArray;