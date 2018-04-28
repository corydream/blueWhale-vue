<template>
    <div class="crawler-help">
        <h1 class="help-doc-head">敏捷BI帮助文档<a style="color:red;margin-left:20px;font-size:16px" href="https://data.banggood.cn/resource/video/AgileBI_help.rar" download>下载视频演示</a></h1>
        <Row>
        	<Col span="14">
        		<div class="crawler-contain" id="gallery">
		        	<div class="instructions-wrap">
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-1">1.快速入门</h3>		        			
							<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-1-1">1.1敏捷BI基本概念</h4>
		        				<div class="img-wrap">
									<a :href="pageImages[0].big"><img alt="image" :src="pageImages[0].mini"></a>
								</div>
		        				<p class="item-text-two">
		        					区别于传统建立数据报表固定且繁琐的开发流程，敏捷BI是先将预先进行数据分析的关键维度指标建立成模型，只需要通过拖拉拽等方式，自动生成您想要的各种可视化图表。
		        				</p>
		        				<ul class="item-list">
		    						<li>【简单】无技术背景、业务人员轻松几分钟内完成数据报表建立</li>
		    						<li>【易用】拖拉拽交互式操作、自定义多维分析、10+图表展现方</li>
		    						<li>【连续】随时随地变更报表数据字段需求、保持分析思维的连续性</li>
		    						<li>【安全】提供多钟权限控制选择，保障数据安全与业务隐私</li>
		    						<li>【丰富】内外部数据联合自助探索式分析，不仅仅满足业务数据</li>
		    					</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-1-2">1.2可视化分析操作</h4>
		        				<div class="img-wrap">
									<a :href="pageImages[1].big"><img alt="image" :src="pageImages[1].mini"></a>
								</div>
								<div class="img-wrap">
									<a :href="pageImages[2].big"><img alt="image" :src="pageImages[2].mini"></a>
								</div>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-1-3">1.3数据看板定义</h4>
		        				<div class="img-wrap">
									<a :href="pageImages[3].big"><img alt="image" :src="pageImages[3].mini"></a>
								</div>
								<p class="text-bottom">数据看板采用了更加灵活的磁贴式布局来显示报表数据的交互，它不仅可以将数据以可视化的方式呈现，还支持通过各种数据筛选和查询，使用各种数据展现方式。一期支持报表显示，后期将同步加入可视化图表。</p>
		        			</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-2">2.图表创建与编辑</h3>
		        			<ul class="item-list">
	    						<li>. 数据图表包含【表格】的多种【图表】形式展现；</li>
	    						<li>. 除了【表格】可以选择显示查询筛选按钮之外，其他【不建议】添加查询按钮，置灰图表查询控件，以免影响页面图表布局。图表加不加查询项根据业务方需求，平台不做限制，保留提供这个功能；</li>
	    						<li>. 可视化数据图表分析；</li>
	    					</ul>
	    					
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-2-1">2.1 新建数据图表</h4>
		        				<p class="item-text-two">
		        					用户可手动创建新数据看板，如无自定义文件夹，则默认保存至部门默认文件夹中。新建数据看板主要用于查看自定义可视化图表分析。
		        				</p>
		        				<p class="text">点击【创建新图表】，完成创建，跳转【自助图表编辑】页面。</p>
		        				<div class="img-wrap">
			        				<a :href="pageImages[4].big"><img alt="image" :src="pageImages[4].mini"></a>
			        			</div>
		        				<p class="text-bottom text-center">图2-1 创建新图表</p>
		        			</div>
		        			<div class="item-level-two" id="section-2-2">
		        				<h4 class="item-two-title" id="section-2-2">2.2 删除数据图表</h4>
		        				<p class="item-text-two">
		        					用户可手动删除数据看板，删除数据看板成功后，数据看板内的图表数据将一同被删除，请谨慎使用
		        				</p>
		        				<p class="text">鼠标选中当前数据看板，点击【删除】，弹出【删除提示框】。</p>
		        			</div>
		        			<div class="item-level-two" id="section-2-3">
		        				<h4 class="item-two-title" id="section-2-3">2.3 编辑数据图表</h4>
		        				<p class="item-text-two">
		        					用户可手动编辑数据看板，可对数据看板的所属文件位置、【数据看板名称】、【备注】等进行二次编辑。
		        				</p>
		        			</div>
		        			<div class="item-level-two" id="section-2-4">
		        				<h4 class="item-two-title" id="section-2-4">2.4 搜索数据图表</h4>
		        				<p class="item-text-two">
		        					在搜索栏，输入关键字，可以对文件夹、数据看板和数据看板中的图表进行搜索查询。
		        				</p>
		        			</div>
		        			<div class="item-level-two" id="section-2-5">
		        				<h4 class="item-two-title" id="section-2-5">2.5 导出数据图表</h4>
		        				<p class="item-text-two">
		        					鼠标移动至数据图表区域，显示图表【编辑】【删除】【导出】选项，点击【导出】执行导出动作，可将数据导出excel文件。
		        				</p>
		        			</div>
		        			<div class="item-level-two" id="section-2-6">
		        				<h4 class="item-two-title" id="section-2-6">2.6 编辑看板布局</h4>
		        				<div class="img-wrap">
			        				<a :href="pageImages[5].big"><img alt="image" :src="pageImages[5].mini"></a>
			        			</div>
		        				<p class="text-bottom">
		        					点击【编辑看板布局】，可通过拖拉拽方式将图表进行大小拖动，位置移动。根据自己想要的优先级进行图表排序。
		        				</p>
		        			</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-3">3.自助编辑图表区域介绍</h3>
		        			<div class="img-wrap">
		        				<a :href="pageImages[7].big"><img alt="image" :src="pageImages[7].mini"></a>
		        			</div>
		        			<p class="text-bottom text-center">图2-2 图表编辑示图</p>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-3-1">3.1 图表模型选择（区域1）</h4>
		        				<p class="item-text-two">
		        					点击【下拉按钮】，选择数据模型，只能选择一种数据模型，选择后会跳转相应的数据模型。切换编辑数据模型，之前的数据将被清楚。【搜索关键词】、【创建新字段】
		        				</p>
		        				<div class="img-wrap">
			        				<a :href="pageImages[8].big"><img alt="image" :src="pageImages[8].mini"></a>
			        			</div>
		        				<p class="text-bottom text-center">
		        					图2-3 选择数据模型
		        				</p>
		        				<div class="img-wrap">
			        				<a :href="pageImages[9].big"><img alt="image" :src="pageImages[9].mini"></a>
			        			</div>
		        				<p class="text-bottom text-center">
		        					图2-4 选择数据模型
		        				</p>
		        				<p class="text-bottom text-center">
		        					点击【+】按钮进入【编辑筛选选项】，命名【字段名称】，设置【字段类型】，选定【聚合函数】、【字段选择】、【计算方式】，最后确定即完成。可参考函数示例进行设置。
		        				</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-3-2">3.2 数值拖拽列（区域2）</h4>
		        				<p class="item-text-two">
		        					鼠标移动至数据图表区域，显示图表【编辑】【删除】【导出】选项，点击【导出】执行导出动作，可将数据导出excel文件。
		        				</p>
		        				<ul class="item-list">
		        					<li>拖拽说明</li>
		        					<li>将维度或数值拖拽至对应的维度区域和数值区域，【表格】内容自动呈现，用户可选择可视化图表进行图表展现形式的切换。</li>
		        					<li>显示固定模型的维度与数值分布，维度与数值将定义拖拽列区域的位置摆放，维度一般用于X轴、数值一般用于Y轴。在此其余还可对维度与数值进行更高阶的设置，如【创建新字段】。</li>
		        					<li>展现形式：支持表格、线形图、柱状图、饼图</li>
		        					<li>表格：便于实现明细数据的查看，具体每条产品的明细信息，价格，名称，提问数，评论数等；</li>
		        				</ul>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-3-3">3.3 表格预览 （区域3）</h4>
		        				<p class="item-text-two">
		        					显示预览图表，切换任意维度、数值、设置，预览区域将实时更新图表状态。此区域还可对维度、数值进行排序、基础聚合运算、高级计算等操作。
		        				</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-3-4">3.4 图表配置（区域4）</h4>
		        				<p class="item-text-two">
		        					图表配置区域包含【报表名称】、【报表描述】、【展现形式】、【表格计算】等对图表编辑的配置项区域。
		        				</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-3-5">3.5 数据筛选（区域5）</h4>
		        				<p class="item-text-two">
		        					拖拽字段至数据筛选区域，点击图示设置图标，弹出编辑对话界面。
		        				</p>
		        				<p class="text">排除，进行筛选关注指标。可选择【存在】【排除】【包含】的关系。</p>
		        				<div class="img-wrap">
				        			<a :href="pageImages[10].big"><img alt="pageImage" :src="pageImages[10].mini"></a>
				        		</div>
				        		<p class="text-bottom text-center">图2-5 编辑筛选选项</p>
				        		<div class="item-level-three">
				        			<h4 class="item-two-title" id="section-3-5-1">3.5.1 筛选数据类型</h4>
				        			<ul class="item-list">
				        				<li>（1）数值类： 当字段为数字型时，可以使用条件筛选设置一个开区间或闭区间</li>
				        				<li>（2）字符类： 字符类目前默认列表筛选，将显示字符维度所有内容，通过设置【包含】【全部】【排除】过滤字符字段。如想过滤产品类型中的A字段，则在筛选器上选择排除A即可</li>
				        				<li>（3）时间日期类：筛选某一时间范围，历史时间，不可以筛选未来的日期</li>
				        			</ul>
				        		</div>
		        			</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-4">4. 生成可视化报表  （核心）</h3>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-1">4.1 自助生成报表流程</h4>
			        			<div class="img-wrap">
				        				<a :href="pageImages[11].big"><img alt="pageImage" :src="pageImages[11].mini"></a>
				        		</div>
		        				<ul class="item-list">
			        				<li>1、点击【创建新的图表】，对新图表进行命名，备注等，并且支持【删除】【导出】再次【编辑】。</li>
			        				<li>2、数据模型默认给定【数值】和【维度】进行拖拽，用户拖拽实现不同维度的数据分析，若不存在分析的指标，支持自定义指标【创建新字段】。</li>
			        				<li>3、支持多种展现形式，对于生成的报表，可选择合适的图表类型，清晰直观的助力销售数据分析。</li>
			        			</ul>
				        		<h4 class="item-two-title margin-top-10">例如：分析近一周亚马逊销售额的变化情况</h4>
				        		<p class="text-bottom">拖拽销售时间至【维度】销售金额到【数值】区域，得到初步的明细数据报表，点击【展现形式】中的折线图，可视化图标进行输出，根据折线图的走势，分析每个阶段的销售额变化，以及大致的了解后期的一个变化趋势，大概的销售额波动范围，实现销售额的阶段性分析并且及时的根据阶段性的波动做出销售动态的调整。</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-2">4.2 报表筛选 - 数据筛选</h4>
		        				<p class="item-text-two">
		        					报表筛选可以自定义筛选需要查看的数据，过滤掉多余的数据，精确定位数据，精确进行分析。
		        				</p>
		        				<h4 class="item-two-title">自定义筛选步骤</h4>			        			
		        				<ul class="item-list">
			        				<li>1、拖拽字段至数据筛选区域</li>
			        				<li>2、点击【筛选编辑图标】，弹出对话框【编辑筛选项】，下一步选择需要筛选的明细数据，筛选动作【全选】【排除】【包含】，右侧提示当前生成的筛选规则，点击【确定】，筛选完成。</li>
			        				<li>3、筛选时间类字段，时间筛选对话框，选择开始时间以及结束时间，或者勾选不限制当该时间等，完成时间类型字段的筛选。</li>
			        				<li>4、数值类筛选，筛选条件含有大于、小于、等于、不等于、大于等于、小于等于、区间以及相应筛选条件下对应的数值范围。</li>
			        			</ul>
			        			<h4 class="item-two-title margin-top-10">分析举例：分析一段时间内订单的销售金额，对应的订单状态</h4>
			        			<p class="text-bottom"> 拖拽订单导入时间、订单状态两个字段到维度以及筛选区域，拖拽销售金额到数值区域，【统计日期】点击筛选设置，时间选择2017-11-11至2017-11-12，点击完成。可切换图表显示的图形。折线图或者柱状图，进一步分析订单状态分布，了解目前订单的在途状态，及时跟进物流运输阶段。</p>
			        			<div class="img-wrap">
				        				<a :href="pageImages[12].big"><img alt="pageImage" :src="pageImages[12].mini"></a>
				        		</div>
				        		<h4 class="item-two-title margin-top-10">例如：分析近一周亚马逊销售额的变化情况</h4>
				        		<p class="text-bottom">拖拽销售时间至【维度】销售金额到【数值】区域，得到初步的明细数据报表，点击【展现形式】中的折线图，可视化图标进行输出，根据折线图的走势，分析每个阶段的销售额变化，以及大致的了解后期的一个变化趋势，大概的销售额波动范围，实现销售额的阶段性分析并且及时的根据阶段性的波动做出销售动态的调整。</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-3">4.3 报表排序</h4>
		        				<p class="item-text-two">
		        					点击维度或者数值，下拉设置>设置排序>选择【默认】【升序】【降序】，可快速了解极值的一个分部，以及不同纬度极值的大概数值情况。
		        				</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-4">4.4 报表聚合计算</h4>
		        				<p class="item-text-two">
		        					聚合函数：求和、平均、最大值、最小值、去重、计数、百分比
		        				</p>
		        				<p class="text">字段选择：只能对可计算的数值进行选择计算，例如数值型原价，售价等</p>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-4-5">4.5 表格计算</h4>
		        				<h4 class="item-two-title margin-top-10">合并单元格</h4>
		        				<p class="item-text-two">
		        					将两个或多个位于同一行或者同一列的单元格合并成一个单元格
		        				</p>
		        				<h4 class="item-two-title">列总计</h4>
		        				<div class="img-wrap">
				        				<a :href="pageImages[13].big"><img alt="image" :src="pageImages[13].mini"></a>
				        		</div>
				        		<p class="text-bottom">对数值类列表（报表），进行自动列计算，点击【列总计】下方显示模型内已选择的【数值】类字段，可单独设置每列计算方式，包括列总计、列平均数、列最大值、列最小值。</p>
				        		<h4 class="item-two-title margin-top-10">使用示例</h4>
				        		<p class="text-bottom">分析内容：分析产品提问数和评论数的关系</p>
				        		<ul class="item-list">
				        			<li>1、选择亚马逊爬虫模型</li>
				        			<li>2、拖拽产品名称到维度一栏，拖拽评论数和提问数到维度一栏，输出图表信息</li>
				        			<li>3、【图表展示】选择折线图，对比分析数据指标的变化趋势，【提问数】【评论数】的趋势变化等</li>
				        		</ul>
				        		<p class="text">如下图示进行可视化自定义选择</p>
				        		<div class="img-wrap">
				        				<a :href="pageImages[14].big"><img alt="image" :src="pageImages[14].mini"></a>
				        		</div>
				        		<p class="text-bottom">通过折线图可以分析发现提问数和评论数整体呈现正相关的线性关系，阶段性提问数的上升会在后续得到一个小阶段的评论数的上升，提问数有助于引导用户选择购买，提问数反馈了用户对该产品的购买兴趣。根据时间间隔的区间，可以再在售页面发布相关科引导用户提问的信息，用户购买感兴趣的信息，以及描述中也可以展现，从而间接的提高客户提问数。</p>
		        			</div>
		        		</div>
		        		<div class="instructions-item">
		        			<h3 class="item-first-title" id="section-5">5.可视化图表展现形式说明</h3>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-5-1">5.1 线形图</h4>
		        				<p class="item-text-two">
		        					 线图可以通过折线的方式显示数据的变化趋势，并且可以显示随时间而变化的连续数据，非常适合用来分析和显示在相等的时间间隔下数据的趋势走向。线图也可用来分析多组数据随时间变化的相互作用和相互影响，比如，用来分析某类商品或是某几类相关的商品随时间变化的销售数量，从而进一步预测未来的销售情况。
		        				</p>
		        				<h4 class="item-two-title">场景示例：每年各省份各类产品的订单数量</h4>
			        			<div class="img-wrap">
				        				<a :href="pageImages[15].big"><img alt="pageImage" :src="pageImages[15].mini"></a>
				        		</div>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-5-2">5.2 线形图</h4>
		        				<p class="item-text-two">
		        					由于易于比较各组数据之间的差别，柱图可以用来显示一段时间内的数据变化或显示各项之间的比较情况，比如展示某个路口不同时间段的车流量对比。
		        				</p>
		        				<p class="text">
		        					柱图的类别轴上至少取1个维度，如省份，产品类型等；值轴上至少取1个度量，如订单数量，利润金额等；
		        				</p>
		        				<h4 class="item-two-title">分析示例：品牌数占榜单比例分析</h4>
			        			<div class="img-wrap">
				        				<a :href="pageImages[16].big"><img alt="pageImage" :src="pageImages[16].mini"></a>
				        		</div>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-5-3">5.3 饼图</h4>
		        				<p class="item-text-two">
		        					饼图显示的是一个数据系列，每个数据系列具有唯一的颜色或图案。饼图可用来展示数据中各项的大小与各项总和的比例，比如展示展示某一种产品品牌在汽车总销量中占有的销售比。
		        				</p>
		        				<p class="text">
		        					饼图是由一个个扇区构成的。每个扇区的标签由数据的维度决定，如区域，产品类型等；每个扇区角度的大小由数据的度量决定，如订单数量，订单金额等。
		        				</p>
		        				<p class="text-bottom">分析示例：亚马逊FBA与非FBA占比分析</p>
			        			<div class="img-wrap">
				        				<a :href="pageImages[17].big"><img alt="pageImage" :src="pageImages[17].mini"></a>
				        		</div>
		        			</div>
		        			<div class="item-level-two">
		        				<h4 class="item-two-title" id="section-5-4">5.4 指标卡</h4>
		        				<p class="item-text-two">
		        					指标看板可以对数据、或销售业绩等状况一目了然地展示，以便项目的参与者们可以及时掌握核心数据状况或者管理现状，从而能够快速制定并实施应对措施。因此，指标看板是发现问题、解决问题的很有效且直观的手段之一。
		        				</p>
		        				<p class="text">
		        					指标看板是由看板标签和看板指标组成。看板标签由数据的维度决定，如区域；看板指标由数据的度量决定，如订单数量，订单金额等。
		        				</p>
		        				<p class="text-bottom">一个指标看板的看板标签最多取1个维度；最少且最多取1个度量。</p>
			        			<div class="img-wrap">
				        				<a :href="pageImages[18].big"><img alt="pageImage" :src="pageImages[18].mini"></a>
				        		</div>
		        			</div>
		        		</div>
		        	</div>
		        </div>
        	</Col>
        	<Col span="4" offset="6" style="position: relative;">
			       	<div class="console" id="myScrollspy">
			       		<ul class="nav nav-tabs nav-stacked" data-spy="affix" data-offset-top="125">
			       			<li class="active"><a href="#section-1">1.快速入门</a> <span class="click-ico down-ico" :class="{'up-ico':showUpDown.down1}" @click="toggleDown(1)"></span>
			       				<ul class="nav">
			                		<li><a href="#section-1-1">1.1敏捷BI基本概念</a></li>
			                		<li><a href="#section-1-2">1.2可视化分析操作</a></li>
			                		<li><a href="#section-1-3">1.3数据看板定义</a></li>
				                </ul>
			       			</li>
			                <li><a href="#section-2">2.图表创建与编辑</a> <span class="click-ico down-ico" :class="{'up-ico':showUpDown.down2}" @click="toggleDown(2)"></span>
			                	<ul class="nav">
			                		<li><a href="#section-2-1">2.1新建数据图表</a></li>
			                		<li><a href="#section-2-2">2.2删除数据图表</a></li>
			                		<li><a href="#section-2-3">2.3编辑数据图表</a></li>
			                		<li><a href="#section-2-4">2.4搜索数据图表</a></li>
			                		<li><a href="#section-2-5">2.5导出数据图表</a></li>
			                		<li><a href="#section-2-6">2.6编辑看板布局</a></li>
				                </ul>
			                </li>
			                <li><a href="#section-3">3.自助编辑图表区域介绍</a> <span class="click-ico down-ico" :class="{'up-ico':showUpDown.down3}" @click="toggleDown(3)"></span>
			                	<ul class="nav">
			                		<li><a href="#section-3-1">3.1图表模型选择（区域1）</a></li>
			                		<li><a href="#section-3-2">3.2数值拖拽列（区域2）</a></li>
			                		<li><a href="#section-3-3">3.3表格预览 （区域3）</a></li>
			                		<li><a href="#section-3-4">3.4图表配置（区域4）</a></li>
			                		<li><a href="#section-3-5">3.5数据筛选（区域5）</a> <span class="click-ico down-ico" :class="{'up-ico':showUpDown.down35}" @click="toggleDown(35)"></span>
			                			<ul class="nav">
			                				<li>
				                				<a href="#section-3-5-1">3.5.1筛选数据类型</a>
				                			</li>
			                			</ul>
			                		</li>
				                </ul>
			                </li>
			                <li><a href="#section-4">4.生成可视化报表  （核心）</a> <span class="click-ico down-ico" :class="{'up-ico':showUpDown.down4}" @click="toggleDown(4)"></span>
			                	<ul class="nav">
			                		<li><a href="#section-4-1">4.1自助生成报表流程</a></li>
			                		<li><a href="#section-4-2">4.2报表筛选 - 数据筛选</a></li>
			                		<li><a href="#section-4-3">4.3报表排序</a></li>
			                		<li><a href="#section-4-4">4.4报表聚合计算</a></li>
			                		<li><a href="#section-4-5">4.5表格计算</a></li>
				                </ul>
			                </li>
			                <li><a href="#section-5">5.可视化图表展现形式说明</a> <span class="click-ico down-ico" :class="{'up-ico':showUpDown.down5}" @click="toggleDown(5)"></span>
			                	<ul class="nav">
			                		<li><a href="#section-5-1">5.1线形图</a></li>
			                		<li><a href="#section-5-2">5.2柱状图</a></li>
			                		<li><a href="#section-5-3">5.3饼图</a></li>
			                		<li><a href="#section-5-4">5.4指标卡</a></li>
				                </ul>
			                </li>
			            </ul>
			       </div>
        	</Col>
        </Row>
    </div>
</template> 

<script>
import Swiper from "./../../../../../static/js/fs_forse";
export default {
  data () {
    return {
    	showUpDown:{
    		"down1":false,
	    	"down2":false,
	    	"down3":false,
	    	"down4":false,
	    	"down5":false,
	    	"down6":false,
	    	"down35":false,
    	},
    	pageImages:[{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/1-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/1-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/1-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/1-2-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/1-2-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/1-2-2-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/1-3-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/1-3-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/2-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/2-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/2-6-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/2-6-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/5-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/5-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/3-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/3-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/3-1-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/3-1-1-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/3-1-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/3-1-2-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/3-5-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/3-5-mini.png"
    	},{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/4-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/4-1-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/4-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/4-2-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/4-5-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/4-5-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/4-5-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/4-5-2-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/5-1-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/5-1-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/5-2-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/5-2-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/5-3-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/5-3-mini.png"
    	},
    	{
    		big:"./../../../../../bgbdp/images/help-center/agileBi/5-4-big.png",
    		mini:"./../../../../../bgbdp/images/help-center/agileBi/5-4-mini.png"
    	}],
    }
  },
  mounted() {
  	let _this=this;
  	setTimeout(function(){
  		$('#myScrollspy').affix({
		  offset: {
		    top: 100,
		    /*bottom: function () {
		      return (this.bottom = $('.footer').outerHeight(true))
		    }*/
		  }
		});
		_this.initImg();
  	},1000);
  },
  components: {
      /*applicationBanner,
      applicationBottom*/
  },
  methods: {
	    change (status) {
	      		console.log(1);
	            //this.$Message.info(`Status: ${status}`);
	        },
	    toggleDown(index){
	    	/*for(let i in this.showUpDown) {
	    		this.showUpDown[i]=false;
	    	};*/
	    	//this.showUpDown["down"+index]=true;
	    },
	    initImg(){
			$('#gallery img').fsgallery();
	    }
  },

}
</script>
<style lang="less" scoped>
@import "./../../../../assets/css/bootstrap-responsive.css";
@import "./../../../../assets/css/fsgallery.css";
	.crawler-help{padding: 40px;
		background-color: #FFFFFF;
	}
	.help-doc-head{padding-bottom:12px;padding-left:40px;border-bottom: 1px solid #efefef;}
	.pub-title{border-bottom:1px solid #dadada; color:#949494; margin-top: 24px; padding-left: 40px;}
	.crawler-contain{padding:40px;}
	.blue-text{border-left:5px solid #4aa5e9; padding:10px; padding-left:24px; box-shadow: 0 1px 6px rgba(0,0,0,0.3);
			p{color:#4aa5e9;}
		}
	.instructions-item,.item-level-two{margin-top:40px;}
	.item-text-first,.item-text-two{margin-top:20px;font-size: 16px;}
	/*.item-text-first{font-size: 16px;}
	.item-text-two{font-size: 12px;}*/
	.item-list{margin-top: 20px; color: #666; padding-left: 24px;
		li{line-height:26px;}
	}
	.img-wrap{margin-top:24px;}
	ul.nav-tabs{
        width:240px;
        margin-top: 20px;
        border-radius:0px;
        border-left:2px solid #d5d2d2;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
        li{
	        margin: 0;
	        a{
	        	color: #333;
		        margin: 0;
		        padding: 8px 16px;
		        border-radius: 0;
		    }
	    }
	    >li{
	    	>ul{
	    		padding-left:16px;
	    	}
	    	&.active{
	    		>ul{display: block;
	    			>li{
	    				&.active{
	    					>ul{display: block;
	    						>li{
					    				&.active{
					    					>ul{display: block;}
					    				}
					    			}
	    					}
	    				}
	    			}
	    		}
	    	}
	    	ul{padding-left:16px;}
	    }
    }
    ul.nav-tabs>li.active>a, ul.nav-tabs>li.active>a:hover{
    	position: relative;
    	left:-2px;
        color: #4aa5e9;
        border: none;
        border-left:2px solid #4AA5E9;
        background: #dbedfb;
    }
    ul.nav-tabs>li.active>ul>li.active>a, ul.nav-tabs>li.active>ul>li.active>a:hover{
    	color: #4aa5e9;
    }
    ul.nav-tabs.affix{
        top: 30px;
    }
    .click-ico{display: inline-block; width:24px; height: 24px; position:absolute; right:24px; top:12px; cursor: pointer;}
    .down-ico{background: url("./../../../../assets/help-center/down-ico.png") no-repeat;}
    .up-ico{background: url("./../../../../assets/help-center/up-ico.png") no-repeat;}
    .down-ico~ul{display: none;}
    .up-ico~ul{display: block;}
    .quick-start{margin-top:12px;padding-left:40px; padding-top: 60px; font-weight: bold; border-top:1px solid #efefef;}
    .img-instructions{
    	line-height: 24px;
	    font-size: 16px;
	    margin-top: 24px;
    }
    .text-bottom{margin-top:12px;}
    
    .margin-top-0{margin-top:0;}
    .margin-top-10{margin-top:10px;}
</style>
