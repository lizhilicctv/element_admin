<template>
	<div>
		<el-card shadow="never" :body-style="{ padding: '0px' }">
			<div slot="header">
				<el-row :gutter="2">
					<el-col :offset="18" :span="4"><el-input placeholder="用户名"></el-input></el-col>

					<el-col :span="2"><el-button type="primary" icon="el-icon-search">查询</el-button></el-col>
				</el-row>
				<br />
				<el-row :gutter="10">
					<el-col :span="2"><el-button size="medium" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button></el-col>
				</el-row>
			</div>
			<el-table :data="data" style="width: 100%" stripe highlight-current-row v-loading="$store.state.loading">
				<el-table-column prop="id" label="id" width="100"></el-table-column>
				<el-table-column prop="title" label="角色名" width="200"></el-table-column>
				<el-table-column prop="desc" label="说明"></el-table-column>
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
		</el-card>

		<el-dialog title="新增角色" :visible.sync="dialogVisible">
			<el-form :label-position="'right'" label-width="80px" :model="role" :rules="rules" ref="ruleForm">
				<el-form-item label="用户名" prop='title'>
					<el-input v-model='role.title' placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="角色说明" prop='desc'><el-input  v-model='role.desc' placeholder="请输入角色说明"></el-input></el-form-item>
				<el-form-item label="是否启用" prop='isopen'><el-switch v-model="role.isopen" active-color="#13ce66" inactive-color="#ff4949"></el-switch></el-form-item>
				
				<el-form-item label="内容">
					
					<el-card style="height: 610px;">
					      <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">
					      </quill-editor>
					    </el-card>
				</el-form-item>
				
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button @click='tijiao' type="primary">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>

</style>
<script>
import {  quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
	name: 'arc',
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
			
			content: null,
			editorOption: {}
		};
	},
	mounted() {
		this.query();
	},
	methods: {
		query() {
			this.$http
				.post('/admin/', {
					type: 'get_role'
				})
				.then(res => {
					if (res.code == 1) {
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
			console.log(this.content)
			
			
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
	},
	components: {
	      quillEditor
	    },
};
</script>
