// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    rememberMe: false
  },

  /**
   * 监听账号输入
   */
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  /**
   * 监听密码输入
   */
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  /**
   * 记住我切换
   */
  onRememberMeToggle() {
    const rememberMe = !this.data.rememberMe;
    this.setData({
      rememberMe: rememberMe
    });
    
    // 如果取消记住我，清除保存的账号密码
    if (!rememberMe) {
      wx.removeStorageSync('rememberedUsername');
      wx.removeStorageSync('rememberedPassword');
    }
  },

  /**
   * 登录按钮点击事件
   */
  onLogin() {
    const { username, password } = this.data;
    
    // 验证输入
    if (!username.trim()) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none'
      });
      return;
    }
    
    if (!password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    // 验证账号密码
    if (username === 'admin' && password === '123456') {
      // 登录成功，保存登录状态
      wx.setStorageSync('isLoggedIn', true);
      wx.setStorageSync('username', username);
      
      // 如果勾选了记住我，保存账号密码
      if (this.data.rememberMe) {
        wx.setStorageSync('rememberedUsername', username);
        wx.setStorageSync('rememberedPassword', password);
      }
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });
      
      // 跳转到主页
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/home/home'
        });
      }, 1500);
    } else {
      wx.showToast({
        title: '账号或密码错误',
        icon: 'error'
      });
    }
  },

  /**
   * 指纹登录按钮点击事件
   */
  onFingerprintLogin() {
    // 检查设备是否支持指纹
    wx.checkIsSupportSoterAuthentication({
      success: (res) => {
        if (res.supportMode && res.supportMode.length > 0) {
          // 支持生物识别，开始认证
          wx.startSoterAuthentication({
            requestAuthModes: ['fingerPrint'],
            challenge: 'login_fingerprint',
            authContent: '请验证指纹以登录',
            success: (res) => {
              if (res.errCode === 0) {
                // 指纹验证成功，使用默认账号登录
                wx.setStorageSync('isLoggedIn', true);
                wx.setStorageSync('username', 'admin');
                
                // 如果勾选了记住我，保存默认账号密码
                if (this.data.rememberMe) {
                  wx.setStorageSync('rememberedUsername', 'admin');
                  wx.setStorageSync('rememberedPassword', '123456');
                }
                
                wx.showToast({
                  title: '指纹登录成功',
                  icon: 'success',
                  duration: 1500
                });
                
                // 跳转到主页
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/home/home'
                  });
                }, 1500);
              }
            },
            fail: (err) => {
              wx.showToast({
                title: '指纹验证失败',
                icon: 'error'
              });
            }
          });
        } else {
          wx.showToast({
            title: '设备不支持指纹登录',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '无法检测指纹功能',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查是否已经登录
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (isLoggedIn) {
      wx.switchTab({
        url: '/pages/home/home'
      });
      return;
    }
    
    // 检查是否有保存的账号密码
    const rememberedUsername = wx.getStorageSync('rememberedUsername');
    const rememberedPassword = wx.getStorageSync('rememberedPassword');
    
    if (rememberedUsername && rememberedPassword) {
      this.setData({
        username: rememberedUsername,
        password: rememberedPassword,
        rememberMe: true
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})