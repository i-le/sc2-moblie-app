  
// 引入客户端io
import io from 'socket.io-client'

// 连接服务器，得到代表连接的socket对象
const socket = io('ws://localhost:8080')

// 向服务器发送消息
socket.emit('sendMsg', {
  name: 'tom',
  date: Date.now()
})
console.log('web sending data：', {
  name: 'tom',
  date: Date.now()
})

// 绑定'receiveMessage'的监听，来接收服务器发送的消息
socket.on('receiveMsg', function(data) {
  console.log('web receiving：', data)
})