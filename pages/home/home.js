// pages/home/home.js
// 引入配置文件
const config = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地图key，从配置文件中获取
    mapKey: config.amapKey,
    // 初始经纬度（北京中心点）
    latitude: 39.90923,
    longitude: 116.397428,
    // 可视化数据
    todayEvents: 4,
    pendingEvents: 4,
    completedEvents: 4,
    // 事件列表数据（减少到12个事件）
    eventList: [
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
    // 当前选中的事件类别
    currentCategory: 'all',
    // 过滤后的事件列表
    filteredEvents: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查登录状态
    this.checkLoginStatus();
    // 获取用户当前位置
    this.getUserLocation();
    // 初始化过滤事件列表
    this.filterEvents();
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus() {
    const isLoggedIn = wx.getStorageSync('isLoggedIn');
    if (!isLoggedIn) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      });
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login'
        });
      }, 2000);
    }
  },

  /**
   * 过滤事件列表
   */
  filterEvents() {
    const { eventList, currentCategory } = this.data;
    let filteredEvents = [];

    switch (currentCategory) {
      case 'all':
        filteredEvents = eventList;
        break;
      case 'today':
        filteredEvents = eventList.filter(item => item.category === 'today');
        break;
      case 'pending':
        filteredEvents = eventList.filter(item => item.status === 'pending');
        break;
      case 'completed':
        filteredEvents = eventList.filter(item => item.status === 'completed');
        break;
      default:
        filteredEvents = eventList;
    }

    this.setData({
      filteredEvents
    });
  },
  /**
   * 获取用户当前位置
   */
  getUserLocation() {
    wx.getLocation({
      type: 'gcj02', // 国测局坐标系，与微信地图坐标系一致
      altitude: false, // 不获取高度
      success: (res) => {
        // 更新地图中心点为用户当前位置
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: (err) => {
        console.log('获取位置失败:', err);
        // 显示详细的错误信息
        wx.showToast({
          title: '获取位置失败: ' + err.errMsg,
          icon: 'none',
          duration: 3000
        });
        // 检查是否是因为用户拒绝了授权
        if (err.errMsg.indexOf('auth deny') > -1 || err.errMsg.indexOf('permission denied') > -1) {
          // 打开设置页面让用户重新授权
          wx.showModal({
            title: '位置权限被拒绝',
            content: '需要您的位置权限才能显示当前位置',
            confirmText: '去设置',
            success: (modalRes) => {
              if (modalRes.confirm) {
                wx.openSetting({
                  success: (settingRes) => {
                    if (settingRes.authSetting['scope.userLocation']) {
                      // 用户授权成功后重新获取位置
                      this.getUserLocation();
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
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

  },

  /**
   * 查看今日事件
   */
  viewTodayEvents() {
    this.setData({
      currentCategory: 'today'
    }, () => {
      this.filterEvents();
    });
    wx.showToast({
      title: '查看今日事件',
      icon: 'none',
      duration: 1500
    });
  },

  /**
   * 查看待处理事件
   */
  viewPendingEvents() {
    this.setData({
      currentCategory: 'pending'
    }, () => {
      this.filterEvents();
    });
    wx.showToast({
      title: '查看待处理事件',
      icon: 'none',
      duration: 1500
    });
  },

  /**
   * 查看处理完成事件
   */
  viewCompletedEvents() {
    this.setData({
      currentCategory: 'completed'
    }, () => {
      this.filterEvents();
    });
    wx.showToast({
      title: '查看处理完成事件',
      icon: 'none',
      duration: 1500
    });
  },

  /**
   * 查看事件详情
   */
  viewEventDetail(e) {
    const eventId = e.currentTarget.dataset.eventId;
    // 根据事件ID查找事件详情
    const eventDetail = this.data.eventList.find(event => event.id === eventId);
    if (eventDetail) {
      // 这里可以添加跳转到事件详情页面的逻辑
      // wx.navigateTo({
      //   url: `/pages/events/event-detail?id=${eventId}`
      // });
      wx.showToast({
        title: `查看事件: ${eventDetail.title}`,
        icon: 'none',
        duration: 2000
      });
    }
  }
})