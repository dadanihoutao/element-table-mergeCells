/**
 * 
 * @param {Array} mergeKeys  要合并的keys数组
 * @param {Array} tableData  渲染table组件的原始数据
 */
export function handleTableSpan(mergeKeys, tableData) {
    const spanObj = {}
    if (mergeKeys instanceof Array && tableData instanceof Array && mergeKeys.length && tableData.length) {
        mergeKeys.forEach(key => {
            spanObj[key] = []
            let position = 0
            tableData.forEach((item, index) => {
                if (index === 0) {
                    spanObj[key].push(1)
                    position = 0
                } else {
                    // 如果要合并的key 值是引用数据类型，我们要先把 数组或者 对象转成json 格式然后对比
                    if (tableData[index][key] instanceof Array || tableData[index][key] instanceof Object) {
                        if (JSON.stringify(tableData[index][key]) === JSON.stringify(tableData[index - 1][key])) {
                            spanObj[key][position] +=1
                            spanObj[key].push(0)
                        } else {
                            spanObj[key].push(1)
                            position = index
                        }
                    } else {
                        if (tableData[index][key] === tableData[index - 1][key]) {
                            spanObj[key][position] +=1
                            spanObj[key].push(0)
                        } else {
                            spanObj[key].push(1)
                            position = index
                        }
                    }
                }
            })
        })
        return spanObj
    }
};

/**
 * 
 * @param {Object} tableObj table组件 span-method 方法四个参数{ row, column, rowIndex, columnIndex } 的对象
 * @param {Array} mergeKeys 要合并的keys数组
 * @param {Object} rowspanObj 经过 handleTableSpan 方法处理tableData 数据，得到的单元格的合并行数对象
 * @param {Boolean} notEmpty 是否要合并有 ’/‘ 单元格，此参数非必传。默认不合并, notEmpty = true 则合并
 */
export function handleObjectSpanMethod (tableObj, mergeKeys, rowspanObj, notEmpty) {
    if (mergeKeys instanceof Array && rowspanObj instanceof Object) {
        const { row, column, rowIndex, columnIndex } = tableObj
        for (let i = 0 ; i < mergeKeys.length; i++) {
            let term
            if (notEmpty) {
                term = column.property === mergeKeys[i] && row[mergeKeys[i]] !== '/'
            } else {
                term = column.property === mergeKeys[i]
            }
            if (term) {
                const _row = rowspanObj[mergeKeys[i]][rowIndex]
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        }
    }
}