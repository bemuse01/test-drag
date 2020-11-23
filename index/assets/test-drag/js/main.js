new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                edge: method.createEdge()
            },
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
                left: 0,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: false,
                x: 0,
                y: 0
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
            document.addEventListener('mouseup', this.onMouseup, false)
            window.addEventListener('mousemove', this.onMousemoveEdge, false)
            window.addEventListener('mouseleave', this.onMouseleaveEdge, false)
            document.addEventListener('mouseup', this.onMouseupEdge, false)
            this.animate()
        },
        onMousedown(e){
            e.preventDefault()

            const box = document.querySelector('#box-wrap')
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
            e.preventDefault()

            const box = document.querySelector('#box-wrap')
            const {width, height} = box.getBoundingClientRect()
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

                let ctop = box.offsetTop - top
                ctop = Math.max(0, ctop)
                ctop = Math.min(500 - height, ctop) 

                let cleft = box.offsetLeft - left
                cleft = Math.max(0, cleft)
                cleft = Math.min(500 - width, cleft)

                this.style.box.top = ctop + 'px'
                this.style.box.left = cleft + 'px'
            }
        },
        onMousedownEdge(cls, e){
            e.preventDefault()

            switch(cls){
                case 'top-left':
                    this.box.topLeft = true
                    break
                case 'top-right':
                    this.box.topRight = true
                    break
                case 'bottom-left':
                    this.box.bottomLeft = true
                    break
                case 'bottom-right':
                    this.box.bottomRight = true
                    break
            }
            this.box.x = e.clientX
            this.box.y = e.clientY
        },
        onMousemoveEdge(e){
            e.preventDefault()

            const box = document.querySelector('#box-wrap')
            const {width, height} = box.getBoundingClientRect()

            if(this.box.topLeft){
                const cwidth =  this.box.x - e.clientX + width
                const cheight = this.box.y - e.clientY + height

                const top = this.box.y - e.clientY
                const left = this.box.x - e.clientX

                this.box.x = e.clientX
                this.box.y = e.clientY

                // if(box.offsetLeft - left <= 0) return
                // if(box.offsetTop - top <= 0) return

                this.style.box.width = Math.min(cwidth, 500) + 'px'
                this.style.box.height = Math.min(cheight, 500) + 'px'
                this.style.box.top = (box.offsetTop - top) + 'px'
                this.style.box.left = (box.offsetLeft - left) + 'px'
            }
            if(this.box.topRight){
                const cwidth = e.clientX - this.box.x + width
                const cheight = this.box.y - e.clientY + height

                const top = this.box.y - e.clientY
                const left = e.clientX - this.box.x

                this.box.x = e.clientX
                this.box.y = e.clientY

                // if(box.offsetLeft - left >= 500 - width) return
                // if(box.offsetTop - top <= 0) return

                this.style.box.width = Math.min(cwidth, 500) + 'px'
                this.style.box.height = Math.min(cheight, 500) + 'px'
                this.style.box.top = (box.offsetTop - top) + 'px'
            }
            if(this.box.bottomLeft){
                const cwidth =  this.box.x - e.clientX + width
                const cheight = e.clientY - this.box.y + height

                const top = e.clientY - this.box.y
                const left = this.box.x - e.clientX

                this.box.x = e.clientX
                this.box.y = e.clientY

                // if(box.offsetLeft - left <= 0) return
                // if(box.offsetTop - top >= 500 - height) return

                this.style.box.width = Math.min(cwidth, 500) + 'px'
                this.style.box.height = Math.min(cheight, 500) + 'px'
                this.style.box.left = (box.offsetLeft - left) + 'px'
            }
            if(this.box.bottomRight){
                const cwidth = e.clientX - this.box.x + width
                const cheight = e.clientY - this.box.y + height

                const top = e.clientY - this.box.y
                const left = e.clientX - this.box.x 

                this.box.x = e.clientX
                this.box.y = e.clientY

                // if(box.offsetLeft - left >= 500 - width) return
                // if(box.offsetTop - top >= 500 - height) return

                this.style.box.width = Math.min(cwidth, 500) + 'px'
                this.style.box.height = Math.min(cheight, 500) + 'px'
            }
        },
        onMouseupEdge(){
            this.box.topLeft = false
            this.box.topRight = false
            this.box.bottomLeft = false
            this.box.bottomRight = false
        },
        onMouseleaveEdge(){
            this.box.topLeft = false
            this.box.topRight = false
            this.box.bottomLeft = false
            this.box.bottomRight = false
        },
        render(){
            const box = document.querySelector('#box-wrap')
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