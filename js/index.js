// dom元素完加载完毕后再执行
window.addEventListener('load',function() {
    // 渲染导航路径
    navPathDataBind()
    function navPathDataBind() {
        // 获取节点
        let navPath = document.querySelector('#wrapper #content .main #navPath')
        // 获取数据
        let path = goodData.path
        // 遍历
        for (let i = 0; i < path.length; i++) {
            // 创建节点
            let aNode = document.createElement('a')
            aNode.href = path[i].url
            aNode.innerText = path[i].title
            let iNode = document.createElement('i')
            iNode.innerText = '/'
            // 插入节点
            navPath.appendChild(aNode)
            if (path[i].url) {
                navPath.appendChild(iNode)
            }
        }
    }

    // 放大镜的移入移出效果
    bigClassBind()
    function bigClassBind() {
        // 获取小图片dom
        const smallPic = document.querySelector('#wrapper #content .main #center .left .leftTop .smallPic')

        // 鼠标移入
        smallPic.addEventListener('mouseenter',function() {
            // 创建蒙版元素
            const maskDiv = document.createElement('div')
            maskDiv.className = 'mask'
            
            // 创建大图框元素
            const bigPic = document.createElement('div')
            bigPic.className = 'bigPic'

            // 创建大图片元素
            const img = document.createElement('img')
            // 获取小图片
            const smallImg = document.querySelector('#wrapper #content .main #center .left .leftTop .smallPic img')
            img.src = smallImg.src

            // 大图框添加大图片
            bigPic.appendChild(img)

            // 将蒙版元素添加到小图片里
            this.appendChild(maskDiv)

            // 获取上半部分节点
            const leftTop = document.querySelector('#wrapper #content .main #center .left .leftTop')
            // 将大图片添加到上半部分
            leftTop.appendChild(bigPic)

            // 鼠标移出事件
            this.addEventListener('mouseleave', function() {
                // 关闭大图框
                if(bigPic) {
                    bigPic.remove(bigPic)
                }
                // 去除蒙版
                maskDiv.remove(maskDiv)
                
            })

            // 鼠标经过事件
            this.addEventListener('mousemove', function(event) {
                // event.clientX 当前鼠标的位置
                // this.getBoundingClientRect().left 小图框距离左侧的可视距离
                let left = event.clientX - this.getBoundingClientRect().left - maskDiv.offsetWidth/2
                let top = event.clientY - this.getBoundingClientRect().top - maskDiv.offsetHeight/2
                let right = this.offsetWidth - maskDiv.offsetWidth
                let bottom = this.offsetWidth - maskDiv.offsetHeight
                // 设置蒙版不溢出
                left = left < 0 ? 0 : left
                left = left > right ? right : left

                top = top < 0 ? 0 : top
                top = top > bottom ? bottom : top

                // 给蒙版添加边距
                maskDiv.style.left = left + 'px'
                maskDiv.style.top = top + 'px'

                img.style.marginTop = -top * 2 + 'px'
                img.style.marginLeft = -left * 2 + 'px'
            })
        })
    }

    // 动态渲染放大镜缩略图的数据
    thumbnailData()
    function thumbnailData() {
        // 获取ul
        const ul = document.querySelector('#wrapper #content .main #center .left .leftBottom #piclist ul')

        // 解构
        const { imagessrc } = goodData

        // 循环遍历
        imagessrc.forEach( item => {
            const newLi = document.createElement('li')
            const newImg = document.createElement('img')
            newImg.src = item.s
            newImg.dataset.b = item.b

            newLi.appendChild(newImg)
            ul.appendChild(newLi)
        })
    }

    // 点击缩略图的效果
    thumbnailClick()
    function thumbnailClick() {
        const lis = document.querySelectorAll('#wrapper #content .main #center .left .leftBottom #piclist ul li img')
        lis.forEach( item => {
            item.addEventListener('click', function() {
                const img = document.querySelector('#wrapper #content .main #center .left .leftTop .smallPic img')
                img.src = item.dataset.b
            })
        })
    }

    // 点击左右箭头的效果
    thumbnailLeftRightClick()
    function thumbnailLeftRightClick() {
        // 获取dom
        const ul = document.querySelector('#wrapper #content .main #center .left .leftBottom #piclist ul')
        const lis = document.querySelectorAll('#wrapper #content .main #center .left .leftBottom #piclist ul li')
        const prev = document.querySelector('#wrapper #content .main #center .left .leftBottom .prev')
        const next = document.querySelector('#wrapper #content .main #center .left .leftBottom .next')
        // 起点
        let start = 0
        // 移动的距离
        let step = (lis[0].offsetWidth + 20) * 2
        // 可移动长度
        let endPostion = ul.offsetWidth * ((lis.length - 5) / lis.length)
        console.log(ul.offsetWidthz);
        prev.addEventListener('click', function() {
            start -= step
            start = start < 0 ? 0 : start
            ul.style.left = -start + 'px'
        })
        next.addEventListener('click', function() {
            start += step
            start = start > endPostion ? endPostion : start
            ul.style.left = -start + 'px'
        })

    }

    // 商品详情渲染
    rightTopData()
    function rightTopData() {
        const {title, recommend, price, promoteSales, support, address, evaluateNum} = goodData.goodsDetail
        document.querySelector('#wrapper #content .main #center .right .rightTop').innerHTML = `
        <h3>${title}</h3>
        <p>${recommend}</p>
        <div class="priceWrap">
            <div class="priceTop">
                <div class="price">
                    <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                    <div>
                        <span>￥</span>
                        <p>${price}</p>
                        <i>降价通知</i>
                    </div>
                </div>
                <p>
                    <span>累计评价</span>
                    <span>${evaluateNum}</span>
                </p>
            </div>
            <div class="priceBottom">
                <p><span>${promoteSales.type}</span>${promoteSales.content}</p>
            </div>
        </div>
        <div class="support"><span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>${support}</div>
        <div class="address"><span>配&nbsp;送&nbsp;至</span>${address}</div>
        `
    }

    // 商品参数渲染
    rightBottomData()
    function rightBottomData() {
        const chooseWrap = document.querySelector('#wrapper #content .main #center .right .rightBottom .chooseWrap')
        const {crumbData} = goodData.goodsDetail
        let dls = ''

        crumbData.forEach(item => {
            const {data} = item
            const dds = data.map((i, index) => {
                if (index === 0) {
                    return `<dd class="active" data-price=${i.changePrice}>${i.type}</dd>`
                }
                return `<dd data-price=${i.changePrice}>${i.type}</dd>`
            })
            dls += `
                <dl>
                    <dt>${item.title}</dt>
                    ${dds.join('')}
                </dl>
            `
        })
        chooseWrap.innerHTML = dls
    }
    
    // 点击参数事件
    ddBindClick()
    function ddBindClick() {
        const dls = document.querySelectorAll('#wrapper #content .main #center .right .rightBottom .chooseWrap dl')
        const choose = document.querySelector('#wrapper #content .main #center .right .rightBottom .choose')
        const marks = new Array(dls.length)
        // 数组填充
        marks.fill(null)

        dls.forEach((items,index) => {
            const dds = items.querySelectorAll('dd')
            dds.forEach(item => {
                item.addEventListener('click', function() {
                    dds.forEach (i => {
                        i.classList.remove('active')
                    })
                    item.classList.add('active')

                    marks[index] = item

                    changePriceBind(marks)

                    choose.innerHTML = ''
                    // 添加选择的参数
                    marks.forEach((m,index2) => {
                        if (m) {
                            const mark = document.createElement('div')
                            mark.className = 'mark'
                            mark.innerHTML = `
                                ${m.innerText}
                                <a href="JavaScript:;" data-id=${index2}>x</a>
                            `
                            choose.appendChild(mark)
                        }
                    })
            
                    const as = choose.querySelectorAll('a')
                    as.forEach(a => {
                        a.addEventListener('click', function() {
                            marks[this.dataset.id] = null
                            choose.removeChild(this.parentNode)

                            ds = dls[this.dataset.id].querySelectorAll('dd')
                            ds.forEach (i => {
                                i.classList.remove('active')
                            })
                            ds[0].classList.add('active')
                        })
                    })
                })
            })         
        })
    }

    // 价格
    function changePriceBind(arr) {
        const oldPrice = document.querySelector('#wrapper #content .main #center .right .rightTop .priceWrap .priceTop .price div p')

        let price = goodData.goodsDetail.price

        arr.map(item => {
            if (item) {
                let changePrice = Number(item.dataset.price)
                return price += changePrice
            }
        })
        oldPrice.innerText = price
    }

    // 封装一个选项卡函数
    function tabClick(tabBtns, tabConts) {
        tabBtns.forEach( (item,index) => {
            tabBtns[index].index = index
            item.addEventListener('click', function() {
                tabBtns.forEach ( (tab, index2) => {
                    tab.classList.remove('active')
                    tabConts[index2].classList.remove('active')
                })
                this.classList.add('active')
                tabConts[this.index].classList.add('active')
            })
        })
    }

    leftTabClick()
    function leftTabClick() {
        const h4s = document.querySelectorAll('#wrapper #goodsDetailWrap .leftAside .asideTop h4')
        const divs = document.querySelectorAll('#wrapper #goodsDetailWrap .leftAside .asideBottom >div')
        tabClick(h4s, divs)
    }

    rightTabClick()
    function rightTabClick() {
        const lis = document.querySelectorAll('#wrapper #goodsDetailWrap .rightDetail .bottomDetail .tabBtns li')
        const divs = document.querySelectorAll('#wrapper #goodsDetailWrap .rightDetail .bottomDetail .tabContents >div')
        tabClick(lis, divs)
    }
})
