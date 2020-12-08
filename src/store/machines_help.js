export default class Machines {
  constructor (
    used,
    id,
    image,
    title,
    // comment,
    commentsArr = []
  ) {
    this.used = used
    this.id = id
    this.image = image
    this.title = title
    this.commentsArr = commentsArr
    // this.comment = comment
    // comments(this.comment)
    // function comments (comment) {
    //   commentsArr.push(comment)
    // }
  }
}
