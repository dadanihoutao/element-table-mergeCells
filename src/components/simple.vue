<template>
    <div class="">
        <el-table 
            :data="listData" 
            :span-method="objectSpanMethod" 
            class="tableArea" 
            style="width: 100%"
        >
        <!-- <el-table :data="listData" class="tableArea" style="width: 100%"> -->
            <el-table-column prop="type" label="序号" align="center" width="200" />
            <el-table-column prop="sheetType" label="工单类型" />
            <el-table-column prop="taskKey" label="taskKey" />
            <el-table-column prop="templateUrl" label="templateUrl" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改" placement="top-start">
                        <i class="el-icon-edit-outline" @click="modify(scope)" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <i class="el-icon-delete" @click="deleteData(scope)" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

import {handleTableSpan, handleObjectSpanMethod} from '../util.js'

export default {
    name: 'myNeedDeal',
    data() {
        return {
            listData: [],
            spanObj: {},
            mergekeys: ['type', 'sheetType', 'templateUrl']
        }
    },
    created () {
    },
    methods: {
        queryData() {//查询操作
            this.listData = [
                {
                    id: 1,
                    type: 1,
                    sheetType: "事件单",
                    taskKey: "shijian_01",
                    templateUrl: "/shijian_01"
                },
                {
                    id: 2,
                    type: 1,
                    sheetType: "事件单",
                    taskKey: "shijian_02",
                    templateUrl: "/shijian_02"
                },
                {
                    id: 3,
                    type: 1,
                    sheetType: "事件单",
                    taskKey: "shijian_02",
                    templateUrl: "/shijian_03"
                },
                {
                    id: 4,
                    type: 2,
                    sheetType: "问题单",
                    taskKey: "wenti_01",
                    templateUrl: "/wenti_01"
                },
                {
                    id: 5,
                    type: 2,
                    sheetType: "问题单",
                    taskKey: "wenti_02",
                    templateUrl: "/wenti_02"
                },
                {
                    id: 6,
                    type: 2,
                    sheetType: "问题单",
                    taskKey: "wenti_03",
                    templateUrl: "/wenti_03"
                }
            ];
            this.handleSpan()
        },
        handleSpan () {
            this.mergekeys.forEach(key => {
                this.spanObj[key] = []
                let position = 0
                this.listData.forEach((item, index) => {
                    if (index === 0) {
                        this.spanObj[key].push(1);
                        position = 0;
                    } else {
                        if (this.listData[index][key] === this.listData[index - 1][key]) {
                            this.spanObj[key][position] +=1;
                            this.spanObj[key].push(0)
                        } else {
                            this.spanObj[key].push(1);
                            position = index
                        }
                    }
                })
            })
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            for (let i = 0 ; i < this.mergekeys.length; i++) {
                if (column.property === this.mergekeys[i]) {
                    const _row = this.spanObj[this.mergekeys[i]][rowIndex]
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            }
        }
    },
    mounted() {
        this.queryData();
    }
}
</script>

 