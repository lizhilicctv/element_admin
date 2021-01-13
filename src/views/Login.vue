<template>
	<div class="login">
		<el-row style="margin-top: 260px;z-index: 1;">
			<el-col :offset="9" :span="6">
				<el-card class="login-box" v-loading="$store.state.loading" element-loading-background="rgba(0, 0, 0, 0.8)">
					<el-form :model="user" :rules="rules" ref="ruleForm">
						<h1 class="title">欢迎使用uni-vue后台</h1>
						<p class="login-box-msg">有你相伴!</p>
						<el-form-item prop="userName">
							<el-input type="text" v-model="user.userName" auto-complete="off" placeholder="请输入用户名..." suffix-icon="el-icon-bell"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<el-input type="password" v-model="user.password" auto-complete="off" placeholder="请输入密码..." suffix-icon="el-icon-edit"></el-input>
						</el-form-item>
						<el-form-item><el-button type="primary" @click="login" :loading="$store.state.loading" class="pull-right" style="width:100%">登录</el-button></el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<style>
.login {
	background: url(../assets/bg.png) no-repeat scroll center center / cover;
	background-size: 100% 100%;
	width: 100%;
	height: 100%;
	position: fixed;
}

.login-box {
	background: #ffffff;
	border: none;
}

.login-box-msg {
	color: #000000;
	text-align: center;
}

.login-box .title {
	color: #000000;
	text-align: center;
}
</style>
<script>
import { Message } from 'element-ui';
export default {
	name: 'Login',
	data() {
		return {
			user: {
				userName: '',
				password: ''
			},
			rules: {
				userName: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
			}
		};
	},
	created: function() {
		this.$store.state.loading = false;
	},
	methods: {
		login() {
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					this.$http
						.post('/index/', {
							username: this.user.userName,
							password: this.user.password,
							type: 'login'
						})
						.then(res => {
							if (res.code == 1) {
								this.$store.commit('setToken', res.token);
								this.$router.push({ path: '/' });
							} else {
								let message = res.message;
								Message.error({
									title: '系统提示',
									dangerouslyUseHTMLString: true,
									message,
									duration: 2000
								});
							}
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
