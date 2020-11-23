new Vue({
    el: '#wrap',
    data(){
        return{
            style: {
                box: {width: '250px', height: '250px', left: '0', top: '0', cursor: 'normal'}
            },
            event: {
                down: false
            },
            pos: {
                x: 0,
                y: 0
            },
            box: {
                top: 0,
                left: 0
            }
        }
    },
    computed: {

    },
    created(){
        this.init()
    },
    methods: {
        init(){
            window.addEventListener('mousemove', this.onMousemove, false)
            window.addEventListener('mouseleave', this.onMouseleave, false)
            window.addEventListener('mouseup', this.onMouseup, false)
            this.animate()
        },
        onMousedown(e){
            const box = document.querySelector('#box')
            const {top, left, bottom, right} = box.getBoundingClientRect()
            this.event.down = true
            this.pos.y = e.clientY
            this.pos.x = e.clientX
            console.log(box.offsetTop, box.offsetLeft)
        },
        onMouseup(e){
            this.event.down = false
        },
        onMouseleave(e){
            this.event.down = false
        },
        onMousemove(e){
            const box = document.querySelector('#box')
            const container = document.querySelector('#container')
            this.style.box.cursor = 'move'

            // console.log(top, left, bottom, right)
            // console.log(e.clientY - top, e.clientX - left)
            // console.log(container.getBoundingClientRect())
            // console.log(e)
            if(this.event.down){
                const top = this.pos.y - e.clientY
                const left = this.pos.x - e.clientX

                this.pos.y = e.clientY
                this.pos.x = e.clientX

                this.style.box.top = (box.offsetTop - top) + 'px'
                this.style.box.left = (box.offsetLeft - left) + 'px'
            }
        },
        render(){
            const box = document.querySelector('#box')
            const {width, height} = box.getBoundingClientRect()

            if(box.offsetTop < 0) this.style.box.top = '0'
            if(box.offsetLeft < 0) this.style.box.left = '0'
            if(box.offsetTop + height > 500) this.style.box.top = (500 - height) + 'px'
            if(box.offsetLeft + width > 500) this.style.box.left = (500 - width) + 'px'
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})