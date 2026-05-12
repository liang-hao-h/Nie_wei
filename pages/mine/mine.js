// pages/mine/mine.js
Page({
  data: {
    username: '',
    avatarUrl: '/images/me.png', // 默认头像
    statusClass: 'offline', // 默认离线状态
    statusText: '离线',
    currentTab: 0, // 当前选中的标签：0-全部，1-待处理，2-已处理
    allEvents: [
            // 今日事件（4个）
            { id: 1, title: '海淀区盗窃案', category: 'today', time: '2025-12-19 09:30', location: '北京市海淀区中关村大街', status: 'pending' },
            { id: 2, title: '朝阳区打架斗殴', category: 'today', time: '2025-12-19 10:15', location: '北京市朝阳区建国路', status: 'pending' },
            { id: 3, title: '东城区诈骗报案', category: 'today', time: '2025-12-19 11:20', location: '北京市东城区王府井大街', status: 'pending' },
            { id: 4, title: '西城区车辆盗窃', category: 'today', time: '2025-12-19 13:45', location: '北京市西城区西单北大街', status: 'pending' },
            // 待处理事件（4个）
            { id: 5, title: '朝阳区盗窃商铺', category: 'pending', time: '2025-12-18 08:50', location: '北京市朝阳区望京SOHO', status: 'pending' },
            { id: 6, title: '东城区诈骗案件', category: 'pending', time: '2025-12-18 10:20', location: '北京市东城区交道口', status: 'pending' },
            { id: 7, title: '西城区抢劫未遂', category: 'pending', time: '2025-12-18 12:30', location: '北京市西城区德胜门', status: 'pending' },
            { id: 8, title: '丰台区打架事件', category: 'pending', time: '2025-12-18 14:15', location: '北京市丰台区科技园', status: 'pending' },
            // 处理完成事件（4个）
            { id: 9, title: '朝阳区盗窃案', category: 'completed', time: '2025-12-14 08:30', location: '北京市朝阳区国贸', status: 'completed' },
            { id: 10, title: '东城区打架斗殴', category: 'completed', time: '2025-12-14 11:15', location: '北京市东城区天坛', status: 'completed' },
            { id: 11, title: '西城区诈骗案', category: 'completed', time: '2025-12-13 14:20', location: '北京市西城区月坛', status: 'completed' },
            { id: 12, title: '丰台区抢劫案', category: 'completed', time: '2025-12-13 16:45', location: '北京市丰台区大红门', status: 'completed' }
          ],
    filteredEvents: []
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从本地存储获取用户名
    const username = wx.getStorageSync('username') || '用户';
    this.setData({
      username: username
    });
    
    // 设置默认状态
    this.setUserStatus('offline');
    
    // 初始化事件列表
    this.filterEvents();
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 每次页面显示时更新用户名
    const username = wx.getStorageSync('username') || '用户';
    this.setData({
      username: username
    });
  },
  
  /**
   * 设置用户状态
   * @param {string} status - 状态类型: online/offline/processing
   */
  setUserStatus(status) {
    let statusClass = '';
    let statusText = '';
    
    switch(status) {
      case 'online':
        statusClass = 'online';
        statusText = '在线';
        break;
      case 'offline':
        statusClass = 'offline';
        statusText = '离线';
        break;
      case 'processing':
        statusClass = 'processing';
        statusText = '处理中';
        break;
      default:
        statusClass = 'offline';
        statusText = '离线';
    }
    
    this.setData({
      statusClass: statusClass,
      statusText: statusText
    });
  },
  
  /**
   * 头像更改事件
   */
  onAvatarEdit() {
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 拍照
          this.chooseImage('camera');
        } else if (res.tapIndex === 1) {
          // 从相册选择
          this.chooseImage('album');
        }
      }
    });
  },
  
  /**
   * 选择图片
   * @param {string} sourceType - 来源类型: camera/album
   */
  chooseImage(sourceType) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: [sourceType === 'camera' ? 'camera' : 'album'],
      success: (res) => {
        // 更新头像URL
        this.setData({
          avatarUrl: res.tempFilePaths[0]
        });
        
        // 保存到本地存储
        wx.setStorageSync('userAvatar', res.tempFilePaths[0]);
        
        wx.showToast({
          title: '头像更新成功',
          icon: 'success'
        });
      },
      fail: (err) => {
        wx.showToast({
          title: '选择图片失败',
          icon: 'error'
        });
      }
    });
  },
  
  /**
   * 状态更改事件
   */
  onStatusChange() {
    wx.showActionSheet({
      itemList: ['在线', '离线', '处理中'],
      success: (res) => {
        switch(res.tapIndex) {
          case 0:
            this.setUserStatus('online');
            break;
          case 1:
            this.setUserStatus('offline');
            break;
          case 2:
            this.setUserStatus('processing');
            break;
        }
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 从本地存储加载头像
    const savedAvatar = wx.getStorageSync('userAvatar');
    if (savedAvatar) {
      this.setData({
        avatarUrl: savedAvatar
      });
    }
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
   * 切换标签事件
   */
  switchTab(e) {
    const tab = parseInt(e.currentTarget.dataset.tab);
    this.setData({
      currentTab: tab
    });
    // 过滤事件列表
    this.filterEvents();
  },

  /**
         * 过滤事件列表
         */
        filterEvents() {
          const { currentTab, allEvents } = this.data;
          let filteredEvents = [];
          
          switch(currentTab) {
            case 0: // 全部
              filteredEvents = allEvents;
              break;
            case 1: // 待处理
              filteredEvents = allEvents.filter(event => event.status === 'pending');
              break;
            case 2: // 已处理
              filteredEvents = allEvents.filter(event => event.status === 'completed');
              break;
            default:
              filteredEvents = allEvents;
          }
          
          this.setData({
            filteredEvents: filteredEvents
          });
        },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
  },

  /**
   * 退出登录
   */
  onLogout() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      confirmColor: '#F5222D',
      success: (res) => {
        if (res.confirm) {
          // 清除本地存储的用户信息
          wx.removeStorageSync('username');
          wx.removeStorageSync('userAvatar');
          wx.removeStorageSync('isLoggedIn');
          
          // 显示退出成功提示
          wx.showToast({
            title: '退出成功',
            icon: 'success',
            duration: 1500
          });
          
          // 延迟跳转到登录页面
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/login/login'
            });
          }, 1500);
        }
      }
    });
  },

})