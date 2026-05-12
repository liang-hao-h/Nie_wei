// pages/handle/handle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 事件选择相关 - 从home.js同步的事件数据
    eventIndex: 0,
    eventList: [
      // 今日事件
      { id: 1, title: '海淀区盗窃案', category: 'today', time: '2025-12-19 09:30', location: '北京市海淀区中关村大街', status: 'pending' },
      { id: 2, title: '朝阳区打架斗殴', category: 'today', time: '2025-12-19 10:15', location: '北京市朝阳区建国路', status: 'pending' },
      { id: 3, title: '东城区诈骗报案', category: 'today', time: '2025-12-19 11:20', location: '北京市东城区王府井大街', status: 'pending' },
      { id: 4, title: '西城区车辆盗窃', category: 'today', time: '2025-12-19 13:45', location: '北京市西城区西单北大街', status: 'pending' },
      { id: 5, title: '丰台区抢劫案', category: 'today', time: '2025-12-19 14:30', location: '北京市丰台区方庄路', status: 'pending' },
      { id: 6, title: '石景山区故意伤害', category: 'today', time: '2025-12-19 16:00', location: '北京市石景山区苹果园大街', status: 'pending' },
      { id: 7, title: '海淀区寻衅滋事', category: 'today', time: '2025-12-19 17:20', location: '北京市海淀区清华大学附近', status: 'pending' },
      { id: 8, title: '朝阳区盗窃电动车', category: 'today', time: '2025-12-19 18:45', location: '北京市朝阳区三里屯', status: 'pending' },
      { id: 9, title: '东城区扒窃案', category: 'today', time: '2025-12-19 19:30', location: '北京市东城区东直门', status: 'pending' },
      { id: 10, title: '西城区网络诈骗', category: 'today', time: '2025-12-19 20:15', location: '北京市西城区金融街', status: 'pending' },
      { id: 11, title: '丰台区敲诈勒索', category: 'today', time: '2025-12-19 21:40', location: '北京市丰台区南三环', status: 'pending' },
      { id: 12, title: '海淀区故意伤害案', category: 'today', time: '2025-12-19 22:25', location: '北京市海淀区五道口', status: 'pending' },
      // 待处理事件
      { id: 13, title: '朝阳区盗窃商铺', category: 'pending', time: '2025-12-18 08:50', location: '北京市朝阳区望京SOHO', status: 'pending' },
      { id: 14, title: '东城区诈骗案件', category: 'pending', time: '2025-12-18 10:20', location: '北京市东城区交道口', status: 'pending' },
      { id: 15, title: '西城区抢劫未遂', category: 'pending', time: '2025-12-18 12:30', location: '北京市西城区德胜门', status: 'pending' },
      { id: 16, title: '丰台区打架事件', category: 'pending', time: '2025-12-18 14:15', location: '北京市丰台区科技园', status: 'pending' },
      { id: 17, title: '石景山区盗窃车内财物', category: 'pending', time: '2025-12-18 16:40', location: '北京市石景山区古城大街', status: 'pending' },
      { id: 18, title: '海淀区寻衅滋事案', category: 'pending', time: '2025-12-17 19:20', location: '北京市海淀区颐和园路', status: 'pending' },
      { id: 19, title: '朝阳区故意损坏财物', category: 'pending', time: '2025-12-17 21:35', location: '北京市朝阳区建国门外大街', status: 'pending' },
      { id: 20, title: '东城区敲诈勒索案', category: 'pending', time: '2025-12-17 11:10', location: '北京市东城区东单', status: 'pending' },
      { id: 21, title: '西城区盗窃手机', category: 'pending', time: '2025-12-16 15:25', location: '北京市西城区阜成门', status: 'pending' },
      { id: 22, title: '丰台区网络诈骗案', category: 'pending', time: '2025-12-16 09:45', location: '北京市丰台区草桥', status: 'pending' },
      { id: 23, title: '石景山区故意伤害案', category: 'pending', time: '2025-12-15 13:30', location: '北京市石景山区杨庄大街', status: 'pending' },
      { id: 24, title: '海淀区盗窃自行车', category: 'pending', time: '2025-12-15 17:50', location: '北京市海淀区北京大学附近', status: 'pending' },
      // 处理完成事件
      { id: 25, title: '朝阳区盗窃案', category: 'completed', time: '2025-12-14 08:30', location: '北京市朝阳区国贸', status: 'completed' },
      { id: 26, title: '东城区打架斗殴', category: 'completed', time: '2025-12-14 11:15', location: '北京市东城区天坛', status: 'completed' },
      { id: 27, title: '西城区诈骗案', category: 'completed', time: '2025-12-13 14:20', location: '北京市西城区月坛', status: 'completed' },
      { id: 28, title: '丰台区抢劫案', category: 'completed', time: '2025-12-13 16:45', location: '北京市丰台区大红门', status: 'completed' },
      { id: 29, title: '海淀区寻衅滋事', category: 'completed', time: '2025-11-30 13:45', location: '北京市海淀区中关村', status: 'completed' }
    ],
    
    // 日期选择相关
    date: '',
    
    // 位置选择相关
    location: '',
    
    // 照片上传相关
    photos: [],
    
    // 处理结果相关
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置默认日期为今天
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.setData({
      date: `${year}-${month}-${day}`
    });
  },

  /**
   * 事件选择变化
   */
  onEventChange(e) {
    this.setData({
      eventIndex: e.detail.value
    });
  },

  /**
   * 日期选择变化
   */
  onDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },

  /**
   * 选择位置
   */
  chooseLocation() {
    // 检查位置权限
    wx.getSetting({
      success: (settingRes) => {
        if (!settingRes.authSetting['scope.userLocation']) {
          // 未授权，请求授权
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              // 授权成功，选择位置
              this.selectLocation();
            },
            fail: (authErr) => {
              console.error('位置权限请求失败:', authErr);
              // 如果用户拒绝授权，引导用户打开设置页面
              wx.showModal({
                title: '权限请求',
                content: '需要您的位置权限来选择服务位置，请在设置中开启',
                confirmText: '去设置',
                cancelText: '取消',
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    wx.openSetting({
                      success: (settingRes) => {
                        if (settingRes.authSetting['scope.userLocation']) {
                          this.selectLocation();
                        }
                      }
                    });
                  }
                }
              });
            }
          });
        } else {
          // 已授权，直接选择位置
          this.selectLocation();
        }
      }
    });
  },

  /**
   * 选择位置的实际操作（内部方法）
   */
  selectLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: res.address
        });
      },
      fail: (err) => {
        console.error('选择位置失败:', err);
        let errorMsg = '选择位置失败';
        
        // 根据错误类型显示不同提示
        if (err.errMsg.includes('auth deny')) {
          errorMsg = '位置权限被拒绝，请开启权限';
        } else if (err.errMsg.includes('cancel')) {
          errorMsg = '已取消位置选择';
        } else if (err.errMsg.includes('fail')) {
          errorMsg = '位置服务异常，请重试';
        }
        
        wx.showToast({
          title: errorMsg,
          icon: 'none'
        });
      }
    });
  },

  /**
   * 上传照片
   */
  uploadPhoto() {
    wx.chooseImage({
      count: 5 - this.data.photos.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        const newPhotos = [...this.data.photos, ...tempFilePaths];
        this.setData({
          photos: newPhotos
        });
      },
      fail: () => {
        wx.showToast({
          title: '选择照片失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 删除照片
   */
  removePhoto(e) {
    const index = e.currentTarget.dataset.index;
    const newPhotos = this.data.photos.filter((_, i) => i !== index);
    this.setData({
      photos: newPhotos
    });
  },

  /**
   * 处理结果输入变化
   */
  onResultInput(e) {
    // 限制最大输入长度为200字
    const value = e.detail.value;
    if (value.length <= 200) {
      this.setData({
        result: value
      });
    }
  },

  /**
   * 提交处理结果
   */
  submitHandle() {
    const { eventList, eventIndex, date, location, photos, result } = this.data;
    
    // 验证表单
    if (!eventList[eventIndex] || !eventList[eventIndex].title) {
      wx.showToast({
        title: '请选择处理事件',
        icon: 'none'
      });
      return;
    }
    
    if (!date) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      });
      return;
    }
    
    if (!location) {
      wx.showToast({
        title: '请选择位置',
        icon: 'none'
      });
      return;
    }
    
    if (photos.length === 0) {
      wx.showToast({
        title: '请上传处理完成照片',
        icon: 'none'
      });
      return;
    }
    
    if (!result) {
      wx.showToast({
        title: '请填写处理结果',
        icon: 'none'
      });
      return;
    }
    
    // 模拟提交处理
    wx.showLoading({
      title: '处理中...'
    });
    
    // 模拟API请求
    setTimeout(() => {
      wx.hideLoading();
      const selectedEvent = eventList[eventIndex];
      wx.showToast({
        title: `${selectedEvent.title} 处理完成`,
        icon: 'success',
        duration: 2000
      });
      
      // 重置表单
      this.setData({
        eventIndex: 0,
        date: '',
        location: '',
        photos: [],
        result: ''
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }, 1500);
  }
});