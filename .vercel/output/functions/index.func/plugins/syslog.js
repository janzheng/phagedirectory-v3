
// Syslog, a replacement for console.log
// Experimental, doesn't really work that well yet

// export default ({app, env, store, isDev }, inject) => {
export default ({ }, inject) => {
  
  const sys = {
    log: (... msg) => {
      console.log(msg)
    },
  }

  inject('sys', sys)
}



