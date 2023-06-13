'use client'

import { scaleLinear } from 'd3-scale'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { CSSProperties, useEffect } from 'react'
import { useMedia } from 'react-media'
import SimplexNoise from 'simplex-noise'
import { useLocaleContext } from '../LocaleContext'

gsap.registerPlugin(ScrollTrigger)

const list = [
   {
      title: 'In 2011, I was 17 years old and embarked on a different path: after the graduation exam of the second year of high school, I went to Beijing Beida Jade Bird to train network marketing',
      zhTitle:
         '2011 我 17 岁，走上了不一样的道路：高二结业会考后，去了北京北大青鸟培训网络营销',
      desc: 'Bringing the money I borrowed from my relatives, I came to Beijing alone. I kept thinking about the words promised by the online sales customer service: 100% employment after studying, and you can make money from work; the so-called class, most of the time is watching the recording. Self-study by video, I watched the video over and over again in 8 months, I remember that at that time, I went to the balcony of the teacher’s office to learn how to build a website at night, there was an old desktop computer in the corner, and I was alone Yes, I would never have thought at the time that the front-end foundation laid at that time would later change the trajectory of my life',
      zhDesc:
         '带上问亲戚借的钱，只身一人来到北京，脑子里一直在回想网上销售客服承诺的那句话：学完 100% 就业，工作就可以赚钱了；所谓上课，大部分时间是看录制好的视频自学，8 个月的时间我反复看了一遍又一遍的视频，记得那时候，一到晚上就去老师办公室的阳台自学建站，那里的角落里有一台旧的台式电脑，就我一个人用，当时的我怎么也不会想到，那时打下的前端基础后来竟然改变了我的人生轨迹',
   },
   {
      title: '2012 I was 18 years old, after graduation, I was bidding in a Putian Hospital on Jiangjun Avenue in Nanjing',
      zhTitle: '2012 我 18 岁，毕业后，在南京将军大道上的一家莆田医院做竞价',
      zhDesc:
         '第一次接触社会，让我明白了这个世界的复杂性，如果你不是身在其中，可能一辈子无法理解，2023 年，百度医疗竞价的广告已经多次整顿过了，不过还是建议大家看病要去专业性的医院',
      desc: 'The first contact with the society made me understand the complexity of this world. If you are not in it, you may not be able to understand it for the rest of your life. In 2023, Baidu’s medical bidding advertisements have been rectified many times, but I still recommend everyone to go to see a doctor professional hospital',
   },
   {
      title: '2013 When I was 19 years old, I came to Hangzhou and formed a relationship with Dane',
      zhTitle: '2013 我 19 岁，我来到了杭州，和达内结下一段缘',
      zhDesc:
         '先是在达内做招生竞价，做到达内集团年会上发言的名单里有我，期间接触了编程，年后毅然决定辞去工作，挑了一个最难的 cpp 开始学习，当时的想法是希望打好基础，可是毕业后因为学历太低，连面试的机会都没有，那时候有点心灰意冷，不过哪里不行补哪里，我开始备考当年 10 月的成人高考，考试结束的日子里，我在椰子鸡火锅店里打工，周末地推 pos 机，想想还挺酷的=。=',
      desc: 'First, I was in the recruitment bidding at Dane, and I was included in the list of speakers at the Dane Group’s annual meeting. Good foundation, but after graduation, I didn’t even have an interview opportunity because of my low academic qualifications. At that time, I was a little discouraged, but I couldn’t make up for it. I started to prepare for the adult college entrance examination in October of that year. I work part-time in a coconut chicken hot pot restaurant, and push POS machines on weekends, which is pretty cool when I think about it =. =',
   },
   {
      zhTitle:
         '2014 我 20 岁，开始函授的成人大学学习，全部积蓄加贷款，在南京达内继续培训 IOS',
      title: 'In 2014, I was 20 years old, and I started to study in an adult university by correspondence, all my savings plus loans, and I continued to train IOS in Nanjing Dane',
      zhDesc:
         '当时听说 IOS 好就业，因为缺口大，有的公司不看学历，不过实际情况是 2014 年 IOS 已经不像两三年前那么人才短缺了，培训大军功不可没啊。。。',
      desc: 'At that time, I heard that IOS is easy to get a job, because there is a big gap, and some companies do not look at academic qualifications, but the actual situation is that in 2014, IOS is not as short of talents as it was two or three years ago, and the training army has contributed a lot. . .',
   },
   {
      zhTitle:
         '2015 我 21 岁，在老家马鞍山找到了一份前端开发的工作，开始了我的前端开发之路',
      title: "2015 I was 21 years old, I found a front-end development job in my hometown Ma'anshan, and started my front-end development journey",
      zhDesc:
         '当我在找 IOS 开发工作的时候，我在老家的软件园里用在北京自学的前端知识，竟然找到了一份实习，那天我从 10 楼电梯一层一层的往下按，挨家挨户的投简历，想想还真是拼，也让我遇到了我的好老师：老华，和朱姐，他们俩是我的伯乐，这么说有点不好意思=。=',
      desc: 'When I was looking for a job in IOS development, I used the front-end knowledge I learned in Beijing in my hometown’s software park to find an internship. That day I pressed down from the elevator on the 10th floor, door-to-door Submitting resumes, thinking about it was really hard work, and it also allowed me to meet my good teachers: Lao Hua, and sister Zhu, they are my Bole, so I am a little embarrassed to say that =. =',
   },
   {
      zhTitle: '2016 我 22 岁，应聘成功上海仟传前端开发工程师，来到上海',
      title: 'In 2016, I was 22 years old, and I successfully applied for the front-end development engineer of Shanghai Qianchuan, and came to Shanghai',
      zhDesc:
         '我记得第一次坐上海地铁的时候，那个激动啊，哈哈哈嗝；这家公司刚进去的时候正在高速发展当中，认识了很多牛人，自身的前端技术也飞速成长，从零搭建了考拉 KOL 系统，当运营来咨询我问题的时候，我才发现原来，我开发的系统真的有人在用啊，哈哈哈嗝',
      desc: 'I remember when I took the shanghai subway for the first time, I was so excited, hahahaha; this company was developing at a high speed when I first entered, and I met a lot of great people, and my own front-end technology also grew rapidly. I built a koala KOL from scratch. System, when the operator came to ask me questions, I realized that the system I developed was actually used by people, hahaha hiccup',
   },
   {
      zhTitle: '2017 我 23 岁，跳槽到了趣头条母公司，开发小程序',
      title: 'In 2017, I was 23 years old, and I moved to Qutoutiao’s parent company to develop small programs',
      zhDesc:
         '这家公司我进来的时候，薪资直接乘以 2.5 了，我很满意那个时候的薪资，在这里我领略了什么叫做资本，部门和同事像流水一样，产品营销花的钱比黑心莆田医院竞价花的还多，在这里，我主导开发萌推商场的小程序端开发，当我离开的时候，同时向社区贡献了 2 个小程序开发端的开源项目，时过境迁小程序开发体验已经很舒服了',
      desc: 'When I entered this company, the salary was directly multiplied by 1.5. I was very satisfied with the salary at that time. Here I learned what is called capital. Departments and colleagues are like flowing water. There are many more. Here, I lead the development of the small program side of the Mengtui shopping mall. When I left, I also contributed 2 open source projects of the small program development side to the community. The development experience of the small program has changed over time.',
   },
   {
      zhTitle:
         '2018 我 24 岁，上半年和朋友创业小程序，下半年到了掌门一对一继续做前端',
      zhDesc:
         '在上海七宝老街对面，我和仟传的前同事，加我一共 4 个人，我做前端，两位后端，还有一位女生负责运营，折腾了半年，最后又各自找班上去了=。=，还是太年轻了，没有流量，没有资源，没有想清楚商业模式，只剩下创意时的分歧，和一腔热情了，映像比较深的是，当时我们尝试做了一个相亲小程序，里面都是假数据，竟然有人选择充钱了=、=；后来分开，同年我去了掌门一对一，年底竟然遇到国家 k12 线上教育禁令，当时整层楼的人被辞退，我办离职手续的时候，队伍排的一眼望不到头，运气真好=。=',
      title: 'I was 24 years old in 2018. In the first half of the year, I started a small program with my friends. In the second half of the year, I went to the master and continued to work on the front end one-on-one',
      desc: "Opposite Qibao Old Street in Shanghai, my former colleague Qian Chuan and I added a total of 4 people. I was the front-end, two back-ends, and a girl was in charge of the operation. After half a year of tossing around, I finally went to the same class =. =, still too young, no traffic, no resources, no clear business model, only differences in creativity, and enthusiasm. The deeper image is that we tried to make a blind date program at that time. It’s all fake data, and someone actually chose to recharge =, =; later separated, I went to the head of the one-on-one in the same year, and at the end of the year, I encountered the national k12 online education ban. At that time, the entire floor was dismissed. During the resignation procedure, the line is so long that you can't see the end at a glance, so lucky =. =",
   },
   {
      zhTitle:
         '2019 我 25 岁，进入同余科技，一待就是 4 年，也是在今年（2019）终于拿到了大学文凭',
      zhDesc:
         '第一次接触金融，这家公司是 toB 的金融衍生品服务提供商，刚进去的时候公司规模还很小，只有不到 10 个人，我觉得很宝贵的是，我以一个核心人员的身份经历了组织发展的不同阶段，有过高光也有过抱团取暖时候，换了 3 次工作地点，经历了 3 任大领导，最多带了 11 名前端开发，4 年时间做了大大小小几十上百个项目，最值得骄傲的是，参与从零搭建了全国最大的场外衍生品交易管理平台系统 BCT；金融这行太神奇了，精英汇聚，很荣幸能成为其中一名追随者',
      title: 'In 2019, I was 25 years old. I entered Tongyu Technology and stayed for 4 years. This year (2019) I finally got a college diploma',
      desc: 'The first time I came into contact with finance, this company is a financial derivative service provider of toB. When I first entered the company, the company was still very small, with less than 10 people. I think it is very valuable that I experienced as a core person I have gone through different stages of organizational development. I have had highlights and times when I was in a group for warmth. I changed the workplace 3 times, experienced 3 big leaders, and brought up to 11 front-end developers. I have done dozens of large and small projects in 4 years. This project, the most proud thing is that it participated in building the largest OTC derivatives trading management platform system BCT in the country from scratch; the financial industry is amazing, gathering elites, it is an honor to be one of the followers',
   },
   {
      zhTitle: '2022 我 28 岁，这年中旬，随着上海疫情解封，我辞职回到了马鞍山',
      zhDesc:
         '回来了，我迷茫了一阵子，从一开始的亢奋，到渐渐平静，拒绝了大部分社交，期间做了 2 件人生大事：买了房子和车子，自己跑装修，花光了大半积蓄；大年三十，第一次，我和爸妈，我们一家三口聚在一起，在新房子里，吃了一顿我妈做的，我爸准备的火锅，我买的饮料的年夜饭，我还拍了一张全家福留做纪念，好开心',
      title: "2022 I am 28 years old. In the middle of this year, with the unblocking of the epidemic in Shanghai, I resigned and returned to Ma'anshan",
      desc: 'I came back, I was confused for a while, from being excited at the beginning to gradually calming down, I refused most of the social interaction, during which I did 2 major events in my life: I bought a house and a car, and I did renovations myself, spending most of it Savings; on New Year’s Eve, for the first time, my parents, my family of three, and I got together in the new house and ate a New Year’s Eve dinner made by my mother, hot pot prepared by my father, and drinks I bought , I also took a family photo as a souvenir, so happy',
   },
]

export const TimeLine = () => {
   const isWide = useMedia({ query: '(min-width: 640px)' })
   const { lang } = useLocaleContext()

   const size = 500 * 1.2
   const mobileSize = 500
   const linear_1 = scaleLinear()
      .domain([
         0,
         !isWide ? mobileSize * (list.length + 1) : size * (list.length + 1),
      ])
      .range([200, 221])
   const linear_2 = scaleLinear()
      .domain([
         0,
         !isWide ? mobileSize * (list.length + 1) : size * (list.length + 1),
      ])
      .range([98, 83])
   const linear_3 = scaleLinear()
      .domain([
         0,
         !isWide ? mobileSize * (list.length + 1) : size * (list.length + 1),
      ])
      .range([39, 53])

   useEffect(() => {
      const content = document.querySelector('#TimeLine')

      if (!content) return

      //====================== make some circles noise * 开始 ======================
      const simplex = new SimplexNoise()
      for (
         let i = 0;
         i <
         (!isWide ? mobileSize * (list.length + 1) : size * (list.length + 1));
         i++
      ) {
         const div = document.createElement('div')
         div.classList.add('circle')
         const n1 = simplex.noise2D(i * 0.003, i * 0.0033)
         const n2 = simplex.noise2D(i * 0.002, i * 0.001)
         let style = {
            transform: `translate(${n2 * (isWide ? 200 : 100)}px) rotate(${
               n2 * 270
            }deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
            boxShadow: `0 0 0 0.1px hsl(${linear_1(i)}, ${linear_2(
               i,
            )}%, ${linear_3(i)}%)`,
            opacity: isWide ? 0 : 1,
         }

         if (i > 0 && i % (!isWide ? mobileSize : size) === 0) {
            div.classList.add('flag')
         }

         Object.assign(div.style, style)
         content.appendChild(div)
      }
      //====================== make some circles noise * 结束 ======================

      setTimeout(() => {
         const flags = document.querySelectorAll('.flag')

         Array.from(flags).forEach((flagEl, index) => {
            const rect = flagEl.getBoundingClientRect()
            const div = document.createElement('div')

            div.classList.add('sssssssssssss')

            const h5 = document.createElement('h5')
            div.classList.add('event')
            div.appendChild(h5)

            const title =
               lang === 'zh-CN' ? list[index].zhTitle : list[index].title
            const desc =
               lang === 'zh-CN' ? list[index].zhDesc : list[index].desc

            h5.textContent = title

            if (desc) {
               const p = document.createElement('p')
               p.textContent = desc
               div.appendChild(p)
            }

            let style: CSSProperties = {
               position: 'absolute',
               top: `${rect.top}px`,
               left: `${rect.left}px`,
               opacity: isWide ? 0 : 1,
            }
            Object.assign(div.style, style)

            content.appendChild(div)
         })

         if (isWide) {
            const circles = document.querySelectorAll('.circle')
            const events = document.querySelectorAll('.event')

            const tl_1 = gsap.timeline({
               scrollTrigger: {
                  scrub: 0.7,
                  start: 'top 25%',
                  end: 'bottom bottom',
               },
            })
            circles.forEach((circle) => {
               tl_1.to(circle, {
                  opacity: 1,
               })
            })

            const tl_2 = gsap.timeline({
               scrollTrigger: {
                  scrub: 0.7,
                  start: 'top 25%',
                  end: 'bottom bottom',
               },
            })
            events.forEach((event) => {
               tl_2.to(event, {
                  opacity: 1,
               })
            })
         }
      }, 200)
   }, [])

   return (
      <div id='TimeLine' className='TimeLine'>
         <div className='scroll'>
            <span>{lang === 'zh-CN' ? '一段旅途故事' : 'a journey story'}</span>
            <svg viewBox='0 0 24 24'>
               <line className='st1' x1={12} y1={1} x2={12} y2='22.5' />
               <line className='st1' x1='12.1' y1='22.4' x2='18.9' y2='15.6' />
               <line className='st1' x1='11.9' y1='22.4' x2='5.1' y2='15.6' />
            </svg>
         </div>
      </div>
   )
}
