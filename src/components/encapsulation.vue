<template>
  <div id="app">
    <div class="content">
        <div class="data-container">
            <h4>商品信息</h4>
            <el-table :data="dataList" border style="width: 100%" :span-method="colspanMethod">
                <el-table-column label="供应商SKU编号" prop="skuCode" align="center" width="160"></el-table-column>
                <el-table-column label="条形码" prop="barCode" align="center"></el-table-column>
                <el-table-column label="商品名称" prop="skuName" align="center"></el-table-column>
                <el-table-column label="发货数量" prop="quantity" align="center"></el-table-column>
                <el-table-column label="状态" prop="statusText" align="center"></el-table-column>
                <el-table-column label="包裹单号" prop="expressPackCode" align="center" width="160"></el-table-column>
                <el-table-column label="物流公司" prop="companyName" align="center"></el-table-column>
                <el-table-column label="物流单号" prop="logisticsNo" align="center" width="160"></el-table-column>
                <el-table-column label="发货时间" prop="deliveryTime" align="center" width="140"></el-table-column>
                <el-table-column label="包裹信息" align="center" prop="arr">
                    <template slot-scope="scope">
                        <div v-if="scope.row.packageLong">
                            <div v-for="(item, index) in scope.row.arr" :key="index">{{item.msg}}</div>
                        </div>
                        <div v-else>/</div>
                    </template>
                </el-table-column>
                <el-table-column label="包材编号" prop="materialsCode" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
  </div>
</template>
<script>
import datas from '../data.js'
import { handleTableSpan, handleObjectSpanMethod } from '../util.js'
export default {
    mixins: [],
    components: {},
    data() {
        return {
            dataList: [],
            // 要合并的单元格的rowspan 数据
            rowspanObj: {},
            // 要纵向合并的单元格的key数组
            mergekeys: ['statusText', 'expressPackCode', 'companyName', 'logisticsNo', 'arr', 'materialsCode']
        };
    },
    created () {},
    computed: {},
    mounted() {
        this.getDataList();
    },
    watch: {},
    methods: {
        getDataList() {
			const length = 'mm';
			const weight = 'g';
			const arr = [];

			datas.forEach((element, index) => {
				element.arr = [
					{ msg: '长：' + element.packageLong + `${length}` },
					{ msg: '宽：' + element.packageWidth + `${length}` },
					{ msg: '高：' + element.packageHeight + `${length}` },
					{ msg: '重量：' + element.packageWeight + `${weight}` }
				]
				element.expressPackCode = element.expressPackCode ? element.expressPackCode : '/';
				element.companyName = element.companyName ? element.companyName : '/';
				element.logisticsNo = element.logisticsNo ? element.logisticsNo : '/';
				element.deliveryTime = element.deliveryTime ? element.deliveryTime : '/';
				element.logisticsNo = element.logisticsNo ? element.logisticsNo : '/';
				element.materialsCode = element.materialsCode ? element.materialsCode : '/';
			});

            this.dataList = datas;
            // 先处理一下数据，拿到要合并单元格的 rowspan 数据
            this.rowspanObj = handleTableSpan(this.mergekeys, this.dataList)
            console.log(this.rowspanObj)
        },
        colspanMethod(tableObj) {
            return handleObjectSpanMethod(tableObj, this.mergekeys, this.rowspanObj, true)
        },
    }
};
</script>

<style>

</style>
