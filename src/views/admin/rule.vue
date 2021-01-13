<template>
	<div>
		<el-card shadow="never" :body-style="{ padding: '0px' }">
			<div slot="header">
				<el-row :gutter="2">
					<el-col :span="2"><el-button size="medium" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button></el-col>
				</el-row>
			</div>
			<el-table :data="data" style="width: 100%" stripe highlight-current-row v-loading="$store.state.loading">
				
				
				<el-table-column prop="id" label="id" width="100"></el-table-column>
				<el-table-column prop="sort" label="排序" width="150">
					 <template slot-scope="scope">
						 <div v-if="!scope.row['show']">
							 <el-input
							   v-model="scope.row['sort']"
							   show-word-limit
							  
							   @focus="focuspai(scope.$index ,scope.row['id'])"
							 />
						 </div>
						 <div v-else>
							 <el-input
							   v-model="scope.row['sort']"
							   show-word-limit
							   type='number'
							    @blur="blurpai(scope.$index ,scope.row['id'])"
							 >
							 	<template  slot="append"><el-button @click="orderpai(scope.$index ,scope.row['id'])" type="success" icon="el-icon-check" circle></el-button></template>
							 </el-input>
						 </div>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="角色名" width="200"></el-table-column>
				<el-table-column prop="name" label="链接" width="200"></el-table-column>
				<el-table-column prop="condition" label="说明"></el-table-column>
				<el-table-column label="状态" width="120">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.status == 1" :type="'success'">已启用</el-tag>
						<el-tag v-else :type="'danger'">已禁用</el-tag>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="edit()">编辑</el-button>
						<el-button type="text" size="small" @click="remove()">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			 <el-pagination
			    layout="prev, pager, next"
				:page-size='5'
			    :total="zongnum"
				:current-page.sync='dangnum'
				@current-change='current_change()'
				>
			  </el-pagination>
			
		</el-card>

		<el-dialog title="新增角色" :visible.sync="dialogVisible">
			<el-form :label-position="'right'" label-width="80px" :model="role" :rules="rules" ref="ruleForm">
				<el-form-item label="用户名" prop='title'>
					<el-input v-model='role.title' placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="角色说明" prop='desc'><el-input  v-model='role.desc' placeholder="请输入角色说明"></el-input></el-form-item>
				<el-form-item label="是否启用" prop='isopen'><el-switch v-model="role.isopen" active-color="#13ce66" inactive-color="#ff4949"></el-switch></el-form-item>
				<el-form-item label="选择权限" prop='checkList'>
					 <el-checkbox-group v-model="role.checkList">
					    <el-divider content-position="left">资讯权限</el-divider>
					    <el-checkbox label="arc_add">添加权限</el-checkbox>
					    <el-checkbox label="arc_update">修改权限</el-checkbox>
					    <el-checkbox label="arc_del">删除权限</el-checkbox>
					    <el-divider content-position="left">友情链接</el-divider>
					    <el-checkbox label="link_add">添加权限</el-checkbox>
					    <el-checkbox label="link_update">修改权限</el-checkbox>
					    <el-checkbox label="link_del">删除权限</el-checkbox>
						<el-divider content-position="left">栏目管理</el-divider>
						<el-checkbox label="cate_add">添加权限</el-checkbox>
						<el-checkbox label="cate_update">修改权限</el-checkbox>
						<el-checkbox label="cate_del">删除权限</el-checkbox>
						<el-divider content-position="left">广告管理</el-divider>
						<el-checkbox label="ad_add">添加权限</el-checkbox>
						<el-checkbox label="ad_update">修改权限</el-checkbox>
						<el-checkbox label="ad_del">删除权限</el-checkbox>
						<el-divider content-position="left">幻灯片管理</el-divider>
						<el-checkbox label="slide_add">添加权限</el-checkbox>
						<el-checkbox label="slide_update">修改权限</el-checkbox>
						<el-checkbox label="slide_del">删除权限</el-checkbox>
						<el-divider content-position="left">留言管理</el-divider>
						<el-checkbox label="message_add">添加权限</el-checkbox>
						<el-checkbox label="message_update">修改权限</el-checkbox>
						<el-checkbox label="message_del">删除权限</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button @click='tijiao' type="primary">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style>
.input-with-select .el-input-group__prepend {
	background-color: #fff;
}
</style>
<script>
export default {
	name: 'admin',
	data() {
		return {
			dialogVisible: false,
			bucketName: 'public',
			data: [],
			role:{
				checkList: [],
				isopen:true,
				title:'',
				desc:''
			},
			rules: {
				title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
				desc: [{ required: true, message: '请填写简介', trigger: 'blur' }],
				checkList: [{ required: true, message: '选择权限', trigger: 'blur' }],
			},
			dangnum:1,
			zongnum:0
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		current_change(e){
			this.query();
		},
		blurpai(index,id){
			//失去焦点
			//console.log(11111111111,index,id)
			this.data[index].show=false
		},
		focuspai(index,id){
			//获取焦点
			//console.log(2,index,id)
			this.data[index].show=true
		},
		orderpai(index,id){
			let zhi= Number(this.data[index].sort)
			console.log(index,id,zhi)
		},
		query() {
			this.$http
				.post('/admin/', {
					type: 'get_rule',
					page:this.dangnum
				})
				.then(res => {
					if (res.code == 1) {
						this.zongnum=res.zongnum
						this.data = res.data;
					}
				});
		},
		edit() {
			this.dialogVisible = true;
		},
		pai() {},
		remove() {
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			});
		},
		tijiao(){
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					this.$http
						.post('/admin/', {
							type: 'add_role',
							data:this.role
						})
						.then(res => {
							
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>
