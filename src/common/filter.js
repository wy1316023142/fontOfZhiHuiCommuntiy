import moment from 'moment'

export default {
  install(Vue) {
      //时间
      // Vue.filter('timeFormat', (date, format = 'YYYY-MM-DD') => {
      //   date*=1
      //   return date ? moment(date).format(format) : '-'
      // });
      Vue.filter('daterful',function  (oldval,filerw ) {
        return moment(oldval).format( filerw || 'YYYY-MM-DD  HH:mm:ss' );
    })
  }
}
