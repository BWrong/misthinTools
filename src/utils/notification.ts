export default (msg: string): Notification => {
  let title = '依能课程工具';
  return new window.Notification(title, {
    body: msg,
    tag: 'course-zip',
    icon: '/app.png'
  });
};
