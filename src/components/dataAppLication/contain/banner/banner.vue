<template>
	<div class="data-app-lication text-left">
		<div class="block">
			<div class="text-center" v-for="item in images">
        <p class="text-desc">亚马逊网页采集器，可以根据您指定的采集入口链接，将该链接下的所有产品的详情页信息采集下来，目前支持亚马逊美国站点。</p>
        <img :src="item.src" />
			</div>
			<div class="swiper-wrap-box" style="height:80px; width:500px;">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in swiperImgs" :key="index">
							<img :src="item.src" />
						</div>
					</div>
					<!-- Add Pagination -->
					<!--<div class="swiper-pagination"></div>-->

				</div>
				<!-- Add Arrows -->
				<div class="swiper-button-next"></div>
				<div class="swiper-button-prev"></div>
			</div>
			<!--<el-carousel height="250px">轮播
		      <el-carousel-item v-for="item in images" :key="item.active">
		        <h3 class="text-center">
		        	<img :src="item.src"/>
		        </h3>
		      </el-carousel-item>
		   </el-carousel>-->
		</div>
	</div>
</template>

<script>
	import Swiper from './../../../../../static/js/swiper.min.js';
	 /*import Swiper from './../../../config/swiper.min.js';*/
	/*import './../../../../assets/css/swiper.min.css'*/
	let galleryTop=null;
	export default {
		data() {
			return {
				images: [{
						src: require('assets/images/000-1.png'),
						active: true
				}
				],
				swiperImgs: [{
					src: require('assets/images/swiper-img-1.png')
				}, {
					src: require('assets/images/swiper-img-2.png')
				}, {
					src: require('assets/images/swiper-img-3.png')
				}, {
					src: require('assets/images/swiper-img-4.png')
				}]
			}
		},
		mounted() {
			this.lunbo();
		},
		components: {
			/*folderMenu,
			container*/
		},
		methods: {
			lunbo() {
				galleryTop = new Swiper('.swiper-container', {
					//pagination: '.swiper-pagination',
					slidesPerView: 4,
					loop:true,
					paginationClickable: true,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					spaceBetween:0
				});
			},
		},
	}
</script>
<style lang="less" scoped>
	@import "./../../../../assets/css/swiper.min.css";
	.block {
		position: relative;
	}

	.data-app-lication {
		text-align: left;
		margin-top: 20px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 250px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	img {
		max-width: 100%;
	}

	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		/*background: #fff;
		 Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}

	.swiper-button-next,
	.swiper-button-prev {
		top: 50%;
		width: 30px;
		height: 30px;
		margin-top: -11px;
	}

	.swiper-wrap-box {
		position: absolute;
		bottom:20px;
		left:60px;
	}

	.swiper-button-next{
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23747474'%2F%3E%3C%2Fsvg%3E"); right: -20px;
	}
	.swiper-button-prev{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23747474'%2F%3E%3C%2Fsvg%3E"); left: -20px;}
  .text-desc{
    position: absolute;
    top: 140px;
    left: 115px;
    color: #f4f9fb;
    width: 420px;
    text-align: left;
  }
</style>
