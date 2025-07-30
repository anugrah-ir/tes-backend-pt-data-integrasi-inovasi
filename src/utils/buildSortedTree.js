const sortByOrder = (arr) => {
        arr.sort((a, b) => a.order_number - b.order_number);
        arr.forEach(item => {
            if (item.children.length > 0) {
                sortByOrder(item.children);
            }
        });
    };

const buildSortedTree = async (items) => {
    const itemMap = new Map();
    const sortedTree = [];

    items.forEach(item => {
        itemMap.set(item.id, { ...item, children: [] });
    });

    itemMap.forEach(item => {
        if (item.parent_id === null) {
            sortedTree.push(item);
        } else {
            const parent = itemMap.get(item.parent_id);
            if (parent) {
                parent.children.push(item);
            }
        }
    });

    sortByOrder(sortedTree);
    return sortedTree;
};

module.exports = buildSortedTree;