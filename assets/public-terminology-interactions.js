/* Generated from approved terminology modules; do not edit. */

(function(){
var input=document.getElementById('termSearch'),cards=Array.prototype.slice.call(document.querySelectorAll('[data-term-card]')),count=document.getElementById('termCount'),empty=document.getElementById('termEmpty'),sections=[];
cards.forEach(function(card,index){var section=card.closest('.module-section[id]');if(section&&sections.indexOf(section)<0)sections.push(section);var code=(card.querySelector('.term-code')||{}).textContent||'';if(!card.id)card.id='term-'+String(code).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g,'-').replace(/^-|-$/g,'')+'-'+index;});
var results=document.createElement('div');results.className='term-search-results';results.setAttribute('aria-live','polite');results.innerHTML='<div class="module-heading"><h2>搜索结果</h2><p>匹配术语代码、英文全称、中文名称和专用别名，并按相关度排序；点击结果直接定位原词条。</p></div><div class="term-grid" id="termSearchGrid"></div>';empty.parentNode.insertBefore(results,empty.nextSibling);var grid=document.getElementById('termSearchGrid');
function norm(v){return String(v||'').normalize('NFKC').trim().toLocaleLowerCase('zh-CN').replace(/\s+/g,' ');}function compact(v){return norm(v).replace(/[\s\-_/+()（）·,.，。:：]/g,'');}
function fields(card){return{code:norm((card.querySelector('.term-code')||{}).textContent),en:norm((card.querySelector('.term-en')||{}).textContent),zh:norm((card.querySelector('h3')||{}).textContent),aliases:norm(card.getAttribute('data-keywords')||'')};}
function score(card,q){var f=fields(card),qc=compact(q),cc=compact(f.code),tokens=f.code.split(/[^a-z0-9\u4e00-\u9fff]+/).filter(Boolean);if(f.code===q||cc===qc)return 1200;if(tokens.indexOf(q)>=0)return 1150;if(f.zh===q||f.en===q)return 1100;if(f.code.indexOf(q)===0||cc.indexOf(qc)===0)return 1000;if(f.zh.indexOf(q)===0)return 900;if(f.en.split(/\s+/).some(function(w){return w.indexOf(q)===0;}))return 850;if(!/^[a-z0-9][a-z0-9.+#&-]{1,15}$/i.test(q)&&(f.code.indexOf(q)>=0||cc.indexOf(qc)>=0))return 800;if(f.zh.indexOf(q)>=0)return 700;if(f.en.indexOf(q)>=0)return 600;if(f.aliases&&f.aliases.indexOf(q)>=0)return 500;return-1;}
function categories(show){sections.forEach(function(section){section.hidden=!show;});}
function locate(card){var code=(card.querySelector('.term-code')||{}).textContent||'';input.value='';render();try{history.replaceState(null,'',location.pathname+'?term='+encodeURIComponent(code)+'#'+card.id);}catch(error){}requestAnimationFrame(function(){card.scrollIntoView({behavior:'smooth',block:'center'});card.classList.remove('term-focus');void card.offsetWidth;card.classList.add('term-focus');setTimeout(function(){card.classList.remove('term-focus');},1900);});}
function clone(original){var hit=original.cloneNode(true);hit.removeAttribute('id');hit.classList.add('term-search-hit');hit.setAttribute('role','link');hit.setAttribute('tabindex','0');var hint=document.createElement('div');hint.className='term-jump-hint';hint.textContent='点击进入该词条的原分类位置';hit.appendChild(hint);hit.addEventListener('click',function(){locate(original);});hit.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();locate(original);}});return hit;}
function render(){var q=norm(input.value);grid.innerHTML='';if(!q){categories(true);results.classList.remove('show');empty.style.display='none';count.textContent='共收录 '+cards.length+' 项术语';return;}var matches=cards.map(function(card,index){return{card:card,index:index,score:score(card,q)};}).filter(function(x){return x.score>=0;}).sort(function(a,b){return b.score-a.score||a.index-b.index;});categories(false);results.classList.toggle('show',matches.length>0);empty.style.display=matches.length?'none':'block';matches.forEach(function(x){grid.appendChild(clone(x.card));});count.textContent=matches.length?'找到 '+matches.length+' 项相关术语（已按相关度排序）':'未找到相关术语';}
input.addEventListener('input',render,{passive:true});input.addEventListener('search',render,{passive:true});
var requested=new URLSearchParams(location.search).get('term')||'';if(requested){var target=cards.find(function(card){var f=fields(card);return f.code===norm(requested)||f.zh===norm(requested);});if(target)locate(target);}
})();

;

(function(){
'use strict';
var cards=Array.prototype.slice.call(document.querySelectorAll('[data-term-card]'));
if(!cards.length||document.getElementById('termOplModal'))return;

var profiles={
  brand:{
    label:'管理理念与改善机制',
    goal:'理解该理念在制造经营中的定位，能够把抽象概念转化为现场行为、管理规则或改善项目。',
    problem:'解决管理语言不统一、改善只停留在口号、项目目标与经营结果脱节的问题。',
    boundary:'应结合企业规模、产品特性与当前成熟度使用；不能把一种理念机械复制成全公司的唯一答案。',
    steps:['明确要改善的经营或现场问题','统一术语口径与适用范围','选择一个可控区域试点验证','用事实数据复盘效果与副作用','固化有效做法并形成推广条件'],
    caseText:'某汽车电子工厂把{term}用于装配线改善：先限定试点范围和问题，再用现场数据验证，最后写入日常管理与复盘机制，避免只做宣传展示。',
    mistakes:['只讲概念，不指定问题、责任人和验证数据','把工具上线或资料完成误当成改善结果','未经试点便全厂铺开，导致形式化执行'],
    owners:'经营负责人／改善负责人牵头，相关部门经理与现场主管共同执行。',
    records:'项目任务书、现状数据、试点记录、效果验证、标准化文件与复盘纪要。'
  },
  roles:{
    label:'职能职责与协同接口',
    goal:'说清该职能的职责边界、输入输出及跨部门接口，减少职责空白和重复管理。',
    problem:'解决部门之间“都在管、又没人负责”，以及问题反复转交、开发与量产脱节的问题。',
    boundary:'岗位名称可因企业组织不同而变化，应以流程责任和交付物为准，不能仅凭部门名称判断职责。',
    steps:['识别该职能的上游输入与客户要求','明确必须负责、协同和知会的事项','定义阶段交付物与放行条件','建立异常升级和变更接口','按项目节点复核责任闭环'],
    caseText:'某座椅开关新产品在PVT前由{term}按职责清单核对输入、量产条件和遗留问题，并与研发、质量、PMC及制造完成签核，防止问题带入MP。',
    mistakes:['以岗位名称代替职责定义','只参加会议，不对交付物和节点负责','职责边界过窄，出现跨部门问题便直接退回'],
    owners:'部门负责人定义职责，项目经理维护接口，岗位承担者对本职输出负责。',
    records:'岗位职责、RACI矩阵、阶段清单、评审纪要、问题清单及签核记录。'
  },
  flow:{
    label:'流程效率与交付改善',
    goal:'掌握该指标或工具的数据口径、现场用法和改善闭环，能够识别等待、库存、波动与瓶颈。',
    problem:'解决只看产出不看过程、指标口径不一致，以及局部效率提升却没有缩短整体交付周期的问题。',
    boundary:'必须先明确产品、工序、班次和统计周期；跨产品或跨线比较时应同步说明工艺、人力与标准工时差异。',
    steps:['选定产品族、流程边界和统计周期','到现场确认数据来源与当前状态','按统一口径计算或绘制现状','识别瓶颈、等待、库存和异常波动','实施小范围改善并用同口径复测','把有效对策纳入标准作业和日常管理'],
    caseText:'某装配线以{term}识别交付损失：现场采集节拍、在制和停机事实，锁定主要约束后实施改善，并用改善前后同口径数据确认结果。',
    mistakes:['混用计划时间、出勤时间和实际生产时间','只报平均值，掩盖波动、换型和异常停机','只优化单工序速度，导致后工序堆积或质量风险'],
    owners:'IE／生产负责现场数据与改善，PMC确认需求边界，质量和设备共同验证。',
    records:'原始测时、产出记录、停机与异常记录、现状／未来态图、改善验证及标准作业。'
  },
  engineering:{
    label:'工程开发与量产验证',
    goal:'掌握该工程活动在EVT、DVT、PVT至MP链条中的输入、验证证据和放行条件。',
    problem:'解决设计输出不完整、变更不同步、验证证据不足以及样品可做但量产不可复制的问题。',
    boundary:'任何放行都应基于已批准的版本和客观证据；临时偏差、口头承诺或单次成功不能替代量产验证。',
    steps:['确认客户需求、版本和适用阶段','列出输入、风险与验证项目','按批准方案执行试制或验证','记录偏差、失效和未决事项','完成关闭验证与跨部门评审','受控发布并同步BOM、工艺、程序和培训'],
    caseText:'某汽车座椅开关项目在{term}节点发现工艺参数与图纸版本不一致，团队冻结放行、完成影响评估和再验证，证据齐套后才进入下一阶段。',
    mistakes:['把样件功能合格等同于量产条件成熟','工程变更只改图纸，未同步BOM、工艺和库存','评审只看结论，不核验原始数据与未决风险'],
    owners:'研发／工程对技术输出负责，NPI或PM组织阶段评审，质量与制造共同确认量产条件。',
    records:'需求规格、验证计划与报告、BOM／工艺路线、变更记录、问题清单和阶段放行表。'
  },
  quality:{
    label:'质量策划与问题解决',
    goal:'掌握该质量工具或标准的适用时机、证据要求和判定边界，形成预防与闭环能力。',
    problem:'解决检验代替预防、问题重复发生、判定凭经验以及质量记录无法追溯的问题。',
    boundary:'应执行客户要求、适用标准和受控版本；统计结论必须满足样本、测量系统和过程稳定性前提。',
    steps:['确认客户要求、标准版本和质量特性','识别风险、缺陷模式或数据需求','选择适用工具、样本和判定规则','执行分析并保留原始证据','制定措施并验证有效性','更新控制文件并持续监控'],
    caseText:'某PCBA过程应用{term}处理焊接异常：先确认缺陷定义和样本边界，再分析证据、验证根因与对策，并同步控制计划和作业文件。',
    mistakes:['先写结论再补数据，根因与证据脱节','忽略测量系统和过程稳定性便直接计算指标','只做围堵，不验证根因和长期措施有效性'],
    owners:'质量工程师主导方法与证据，责任部门落实措施，工程与生产共同验证。',
    records:'检验／测量原始数据、分析表、问题报告、措施验证、控制计划和标准更新记录。'
  },
  production:{
    label:'计划、物料与生产运营',
    goal:'理解该计划或物料概念的输入逻辑、运算边界和执行反馈，支撑齐套、排产与准时交付。',
    problem:'解决销售需求、物料、能力和现场执行脱节，避免计划频繁变动、欠料停线与交付失真。',
    boundary:'计划结果取决于订单、BOM、库存、提前期、产能和损耗等基础数据；数据未核实前不能把系统结果直接当作执行指令。',
    steps:['确认订单需求、交期和优先级','核对BOM、库存、在途与损耗','校验人机料法环及产能约束','形成可执行计划并冻结适当窗口','采集实绩、欠产和异常原因','滚动调整后续计划并闭环交付'],
    caseText:'某周交付计划使用{term}联动订单、物料和工位能力；当日超产或欠产实时回写，后续计划按未完成量滚动调整，避免“表上完成、现场欠产”。',
    mistakes:['只按订单数量排产，不校验物料与工位能力','用月度平均产能掩盖日别瓶颈和换型损失','实绩未回写，仍按原计划判断完成状态'],
    owners:'PMC牵头，销售确认需求，采购与仓储保障齐套，生产和IE反馈能力与实绩。',
    records:'订单需求、物料齐套表、能力负荷、日排产、生产实绩、欠产原因和交付关闭记录。'
  },
  digital:{
    label:'数智化系统与数据闭环',
    goal:'理解该系统或技术在业务架构中的层级、数据来源和接口边界，避免“系统上线但业务未闭环”。',
    problem:'解决多套表格口径冲突、数据重复录入、计划与现场断层以及异常不能及时追溯的问题。',
    boundary:'系统不能替代稳定流程和准确主数据；实施前应明确业务责任、编码规则、接口、权限和异常补偿机制。',
    steps:['定义业务问题与目标流程','梳理主数据、交易数据和责任人','明确系统边界及上下游接口','先用样板业务验证数据闭环','验证异常、权限和追溯场景','分阶段推广并监控数据质量'],
    caseText:'某工厂导入{term}时先打通订单、编码、BOM、工艺、排产与实绩链路，选一条产品线验证后再扩展，避免只上线界面而数据无法支撑决策。',
    mistakes:['先买系统，后补流程和主数据','同一指标在ERP、MES和Excel中口径不同','只验证正常流程，遗漏返工、拆单、欠料和补录异常'],
    owners:'业务负责人对流程与数据负责，IT／自动化负责技术实现，关键用户参与测试与验收。',
    records:'业务蓝图、数据字典、接口清单、权限矩阵、测试案例、问题清单和上线验收记录。'
  },
  manufacturing:{
    label:'制造工艺、文件与安全',
    goal:'掌握该工艺、文件或安全要求的控制要点、异常判定和追溯证据，稳定现场执行。',
    problem:'解决作业依赖个人经验、工艺参数漂移、检验遗漏以及安全和静电风险失控的问题。',
    boundary:'必须按产品等级、受控文件、设备能力和安全规范执行；未经批准不得擅自修改参数、程序或判定标准。',
    steps:['确认受控版本、产品等级和设备状态','核对材料、工装、程序与环境条件','按标准顺序和参数执行作业','监控关键参数与检验结果','隔离异常并按权限处置','完成追溯记录和班次交接'],
    caseText:'某电子制造现场针对{term}建立参数、点检和异常隔离要求，操作员按受控文件执行，班组长抽查，工程与质量用记录追溯波动来源。',
    mistakes:['文件已更新但现场仍使用旧版本','只记录合格结论，不保留参数和原始结果','异常品未隔离便继续流转或混入下一工序'],
    owners:'制造执行，工程维护工艺，质量负责判定与审核，设备／EHS负责设备和安全条件。',
    records:'SOP／作业指导书、参数记录、设备点检、检验结果、异常隔离单和追溯批次。'
  }
};

var special={
  'DFMA':{
    focus:'在设计阶段同时评审可制造性与可装配性，把制造和装配的约束前移到设计决策点，从源头避免浪费的产生。',
    method:['确认产品功能与性能要求，列出关键制造与装配约束','评审零件数量、材料、公差与装配顺序','用DFM检查制造可行性，用DFA检查装配效率','对高成本或难制造、难装配的结构提出替代方案','用样件或仿真验证改进效果','把评审结论固化为设计规范与检查清单'],
    caseText:'某家电产品在设计评审中用DFMA发现：外壳用4颗不同规格螺钉固定，装配需换3次工具；改为2颗同规格卡扣加1颗螺钉后，装配时间缩短40%，零件种类减少，售后拆装也更方便。',
    questions:['DFMA为什么要在设计阶段做，而不是等到量产后？','DFM和DFA分别关注什么？两者如何协同？','如果一个设计DFM通过但DFA不通过，应该怎么处理？']
  },
  'VA':{
    focus:'以功能为对象分析成本，区分必要功能与不必要成本，找到降本而不损功能的改进点。',
    method:['选定分析对象与成本范围','列出产品全部功能并区分为基本功能与辅助功能','核算每项功能的成本','识别功能过剩、重复或成本畸高的环节','提出替代方案并评估功能与成本变化','验证改进后功能不受损并固化'],
    caseText:'某开关产品价值分析发现：装饰性金属圈占成本12%，但用户并不看重；改用注塑件并保留功能后，单件成本下降约10%，外观与手感验收通过。',
    questions:['价值分析为什么以功能为对象，而不是以零件为对象？','如何判断一项功能是必要的还是过剩的？','降本后如何验证功能没有受损？']
  },
  'VE':{
    focus:'在产品开发早期以功能为中心统筹成本，用系统方法在设计阶段锁定价值，避免后期改造成本。',
    method:['明确产品必须实现的功能与性能边界','建立功能系统图，区分基本功能与辅助功能','设定目标成本并分解到功能与零件','用头脑风暴与方案比较寻找低成本实现方式','评估方案的功能、成本、风险与可制造性','选定方案并纳入设计基线'],
    caseText:'某新产品开发中用价值工程设定目标成本：团队把功能分解到零件级，发现某结构件可用标准件替代定制件，功能不变，模具费省去，开发周期缩短两周。',
    questions:['价值工程与价值分析的区别是什么？','为什么价值工程强调在开发早期做？','目标成本应该如何设定与分解？']
  },
  'BOM-OPT':{
    focus:'精简物料清单的结构与种类，用标准化与通用化降低全链条的物料管理成本。',
    method:['导出当前BOM并核对层级、用量与版本','识别重复、近似与低用量零件','推动可通用的零件合并与规格统一','核对替代对功能、工艺与认证的影响','更新BOM并同步采购、库存与生产','定期复核防止零件种类反弹'],
    caseText:'某产品BOM优化发现：同类螺钉有7种规格，实际可统一为2种；合并后采购批量增大、单价下降，线边备料与错装风险同步降低。',
    questions:['BOM优化为什么先从零件种类入手？','合并零件规格时必须核对哪些影响？','BOM更新后哪些部门必须同步？']
  },
  'PART-STD':{
    focus:'用统一的规格与选型规则减少非标件，让零件在不同产品间通用互换。',
    method:['梳理现有零部件清单与使用频次','定义标准件、优选件与受限件分级','制定选型规则与审批流程','新设计优先选用标准件与优选件','定期评审非标件并推动替代','把标准件库纳入设计评审检查项'],
    caseText:'某企业推行零部件标准化：把常用连接器从23种收敛到6种标准件，新产品设计直接选用，采购周期缩短，备件库存下降约三成。',
    questions:['零部件标准化为什么能降低成本？','标准件、优选件、受限件如何分级管理？','新设计如何确保优先选用标准件？']
  },
  'FIXTURE':{
    focus:'用工装夹具保证装配定位精度与一致性，减少人为差异与调试返工。',
    method:['确认产品定位基准与装配精度要求','设计定位、夹紧与防错结构','评审夹具对操作可达性与效率的影响','制作样件并验证重复定位精度','固化夹具图纸、点检与保养要求','纳入换型与新品导入检查'],
    caseText:'某装配线新夹具把定位时间从每件30秒降到8秒：定位销与防错槽一次到位，操作员不再凭手感调整，首件合格率明显提升。',
    questions:['工装夹具设计首先要确认什么？','夹具如何兼顾定位精度与操作效率？','夹具的点检与保养为什么要固化？']
  },
  'AUTOMATION':{
    focus:'判断工序是否具备自动化条件，明确改造前置项与投入产出，让自动化产生真实价值。',
    method:['识别重复、危险或精度要求高的工序','评估来料稳定性、定位精度与异常处理能力','明确自动化前必须先标准化的内容','核算投入、节拍提升与质量收益','小范围试点验证后再推广','保留人工干预与异常处理接口'],
    caseText:'某工序上自动化前先做标准化：来料公差与定位方式统一后，自动上下料一次成功率从70%提升到98%，再无频繁停机调机。',
    questions:['为什么自动化之前要先做标准化？','哪些工序不适合马上自动化？','如何核算自动化的投入产出？']
  },
  'RELIABILITY':{
    focus:'用试验与数据证明产品在规定条件与时间内可靠工作，为放行提供客观证据。',
    method:['明确可靠性指标、试验条件与判定标准','制定验证计划与样本量','按批准方案执行试验并记录失效','分析失效模式与根本原因','完成整改与再验证','把验证结论纳入放行评审'],
    caseText:'某开关做可靠性验证：高温高湿试验中发现触点氧化导致接触不良，团队改进触点材料并再验证通过，避免批量客诉。',
    questions:['可靠性验证的判定标准由谁定？','试验中发现失效应该怎么处理？','验证结论如何用于量产放行？']
  },
  'DESIGN-FEEDBACK':{
    focus:'把现场与售后发现的问题闭环反馈给设计，让设计在下一轮迭代中改进。',
    method:['收集制造、检验与售后发现的问题','分类并定位到设计要素','评估影响范围与复发风险','形成设计更改需求并评审','跟踪更改实施与验证','把教训纳入设计规范与检查清单'],
    caseText:'某产品售后反馈装配干涉频发：问题定位到某支架尺寸链，设计更改后干涉消失，该尺寸链检查项纳入新品评审清单。',
    questions:['设计反馈为什么要闭环管理？','哪些问题必须反馈给设计？','如何防止同类问题重复发生？']
  },
  'DIGITALIZATION':{
    focus:'用数据与系统打通全价值链信息，让过程可视、问题可追溯、改善可持续。',
    method:['明确要贯通的信息与业务场景','统一数据口径与编码规则','打通研发、工艺、生产与质量系统','建立关键指标看板与异常预警','用数据复盘改善效果','把有效做法固化为系统规则'],
    caseText:'某工厂数智化贯通：生产、质量与设备数据实时上屏，异常自动推送责任人，问题从发现到闭环平均缩短一半，改善有数据可查。',
    questions:['数智化首先要统一什么？','数据贯通后如何用于日常改善？','如何避免系统上线后没人用？']
  },
  'OEE':{
    focus:'以可动率、性能效率和质量率分解设备时间损失，找到真实改善优先级。',
    formula:'OEE＝可动率 × 性能效率 × 质量率。三项必须使用同一计划生产时间边界，并保留停机、速度损失与不良原始数据。',
    method:['定义设备、产品、班次和计划生产时间','分类记录计划停机与故障、换型等非计划停机','按理想周期核算性能效率','按合格产出核算质量率','绘制损失柏拉图并优先处理最大损失','同口径复测并标准化'],
    caseText:'某自动化线可动率90%、性能效率92%、质量率98%，OEE约为81.1%。团队不能只说“设备利用率高”，而应继续从停机、降速和不良三类损失中确定改善重点。',
    questions:['OEE三项因子分别反映哪类损失？','计划停机是否计入可动率分母，必须先确认什么？']
  },
  'UPPH':{
    focus:'按合格产出和直接人工投入评价人效，同时防止跨产品、跨工艺误比。',
    formula:'UPPH＝合格产出 ÷（直接人力 × 实际生产小时）。休息、停线、支援人力和返工工时是否计入，必须在统计口径中明确。',
    method:['锁定产品、产线、班次和统计时段','确认合格产出，不把返工后重复产出累计两次','统计该时段直接投入人数及实际生产小时','计算人均小时产出并与标准工时交叉校验','分析线平衡、等待和异常造成的人力损失','改善后用相同产品与口径复测'],
    caseText:'某线8名直接人员生产7.5小时，合格产出480件，UPPH＝480÷（8×7.5）＝8件/人·小时。若另有2小时支援工时，应按约定口径折算计入，不能隐藏投入。',
    questions:['UPH与UPPH的分母有什么根本差别？','返工后合格产品是否可重复计入产出？']
  },
  'UPH':{
    focus:'衡量产线、设备或工序每小时合格产出，不直接反映投入人数。',
    formula:'UPH＝合格产出 ÷ 实际生产小时。必须注明统计对象是设备、工序、产线还是班组。',
    caseText:'某产线7.5小时合格产出600件，UPH＝80件/小时。即使投入人数变化，UPH公式不变；评价人效应另看UPPH。',
    questions:['UPH是否能单独判断人效改善？为什么？','统计停线时间时需要保持什么口径？']
  },
  'TT':{
    focus:'把客户需求转换为生产节奏，是线平衡、人员配置和产能判断的需求基准。',
    formula:'客户需求节拍＝可用生产时间 ÷ 客户需求量。时间与需求必须处于同一周期，且先扣除约定的非生产时间。',
    caseText:'某班可用生产时间420分钟，客户需求840件，TT＝30秒/件。若工序CT持续大于30秒，必须改善、并行或增加资源。',
    questions:['TT由客户需求还是当前产能决定？','CT大于TT时现场意味着什么？']
  },
  'CT':{
    focus:'测量某工序完成相邻两个合格单位的循环间隔，用于判断是否满足客户节拍。',
    formula:'连续稳定生产时，CT可按观察总时间÷完成数量计算；应分离异常停机并同时保留异常占比，不能只报平均值。',
    caseText:'某工位连续完成20件用时600秒，观察CT为30秒/件；若客户TT为27秒/件，该工位存在3秒/件的能力缺口。',
    questions:['CT与标准工时是否必然相等？','为什么既要记录正常循环，也要记录异常停机？']
  },
  'LT':{
    focus:'从需求触发到交付完成观察全过程时间，暴露等待、库存和流动造成的交付损失。',
    formula:'LT＝结束时间－开始时间，按所定义流程边界累计加工、等待、库存、搬运和排队时间。',
    caseText:'某产品实际加工只有20分钟，但从领料到入库经历2.5天，LT应按2.5天计算；20分钟只是其中的加工时间。',
    questions:['LT是否只包含加工时间？','不同部门分别优化局部工时，为什么总LT可能不变？']
  },
  'PCE':{
    focus:'用增值时间占总交付周期的比例识别流程中等待与库存的压缩空间。',
    formula:'PCE＝增值时间 ÷ 总交付周期 ×100%。总周期必须包含加工、等待、库存和流动。',
    caseText:'某流程增值时间30分钟，总LT为600分钟，PCE＝5%。改善重点通常不是再压缩几秒动作，而是减少排队、在制和等待。',
    questions:['检验时间是否一定属于增值时间？应按什么原则判断？','PCE很低时应优先调查哪类时间？']
  },
  'FPY':{
    focus:'识别过程第一次就做对的能力，避免返工后合格掩盖过程损失。',
    formula:'FPY＝一次合格数量 ÷ 投入数量 ×100%。返工、返修后合格不能回填为一次合格。',
    caseText:'投入1000件，首次通过960件，返工后又合格35件；FPY仍为96%，最终合格率可为99.5%，两者不能混用。',
    questions:['返工后合格为什么不能计入FPY分子？','FPY与最终合格率各回答什么问题？']
  },
  'FQC':{
    focus:'确认完工产品满足最终检验要求，并防止用末端筛选掩盖过程失控。',
    method:['确认产品、批次、工单和受控检验版本','核对尺寸、外观、功能、性能及记录要求','按规定样本、设备和方法完成最终检验','隔离不合格品并界定影响批次','按权限完成复验、评审与状态标识','将结果反馈到过程控制与持续改进'],
    caseText:'某产品完成装配后，FQC按最终检验标准核对功能、外观和追溯记录；发现批次标签与工单不一致后立即冻结该批，而不是只补贴标签后放行。',
    questions:['FQC与IPQC的控制时点和目的有何区别？','为什么FQC不能替代过程质量控制？']
  },
  'OQC':{
    focus:'在出货前验证实物、包装、标识、文件与授权状态一致，阻止风险流向客户。',
    method:['确认订单、客户、产品、批次和出货要求','核对抽检或最终检验结论及异常关闭状态','检查数量、标签、包装、报告和客户特殊要求','确认追溯信息与实物一一对应','按授权清单完成放行或冻结','保留出货检验及放行证据'],
    caseText:'某批产品功能检验合格，但OQC发现客户标签版本错误，立即冻结出货并追溯已包装范围；只有换标复核和授权完成后才恢复放行。',
    questions:['OQC与FQC分别关注什么控制时点？','异常尚未关闭时，谁可以授权放行，需要什么证据？']
  },
  'DPPM':{
    focus:'按不合格品而非缺陷机会统一百万分率口径，准确评价低不良水平。',
    formula:'DPPM＝不合格品数 ÷ 检验总数 ×1,000,000。同一件产品有多个缺陷时，按不良品口径通常只计一件；客户另有规定时从其要求。',
    method:['定义产品范围、统计周期和不合格品判定','确认检验总数并排除重复入数','按唯一产品或追溯号识别不合格品','计算DPPM并与目标、历史和客户口径对比','按产品、缺陷、工序、供应商或批次分层','针对主要来源改善并用同口径复测'],
    caseText:'某月检验200000件，其中40件判为不合格品，DPPM＝40÷200000×1000000＝200；即使其中5件各有两个缺陷，不合格品数量仍为40件。',
    questions:['一件产品出现三个缺陷，DPPM分子通常计几件？','为什么不同分母和统计周期的DPPM不能直接混比？']
  },
  'COPQ':{
    focus:'把不良造成的内部与外部损失转化为同口径成本，支持改善优先级和经营决策。',
    formula:'COPQ＝内部失效成本＋外部失效成本＋经确认纳入的其他不良损失。必须注明统计周期、责任范围、计价依据及是否包含机会损失。',
    method:['定义统计边界、周期和财务计价规则','收集报废、返工、复检、挑选与停线成本','收集退货、索赔、保修、加急和客户处置成本','按产品、缺陷、工序与责任来源分层','以成本和风险共同确定改善优先级','验证措施后确认实际成本下降并固化标准'],
    caseText:'某月报废8万元、返工与复检3万元、客户退货及加急2万元，确认口径内COPQ为13万元；团队应继续按缺陷和工序分层，不能把全部金额笼统归为品质部责任。',
    questions:['COPQ是否等同于全部质量成本？','尚未兑现的理论机会损失能否直接计为实际节省？']
  },
  'ROI':{
    focus:'判断改善或投资项目的经济回报，防止只统计收益、不统计持续成本。',
    formula:'ROI＝期间净收益 ÷ 项目总投入 ×100%。净收益应扣除维护、能耗、耗材、培训和持续运行成本。',
    caseText:'项目投入20万元，年度可验证净收益8万元，年度ROI为40%；仍需结合回收期、风险和现金流判断是否实施。',
    questions:['设备节省的理论人力能否直接全部计为现金收益？','ROI评估为什么要纳入持续运行成本？']
  },
  'RPN':{
    focus:'在传统FMEA中用严重度、发生度和探测度乘积辅助排序风险，但不替代对高严重度的单独关注。',
    formula:'RPN＝S（严重度）×O（发生度）×D（探测度）。按企业采用的FMEA手册和评分表执行。',
    caseText:'某失效S=9、O=3、D=4，RPN=108。即使总分并非最高，高严重度仍需优先评审，不能只按RPN由大到小机械排序。',
    questions:['RPN相同的两个风险是否必然具有相同优先级？','高严重度项目为何不能因发生度低而忽略？']
  },
  'Cp/Cpk':{
    focus:'评价稳定过程相对规格的潜在能力与实际居中程度。',
    formula:'Cp＝(USL－LSL)÷6σ；Cpk＝min[(USL－μ)÷3σ，(μ－LSL)÷3σ]。使用前须确认测量系统可接受且过程统计稳定。',
    caseText:'某尺寸Cp较高但Cpk明显偏低，说明过程离散可能不大但均值偏离规格中心；应先调整中心，而不是只看Cp合格。',
    questions:['为什么Cpk通常不大于Cp？','过程不稳定时直接报告Cpk有什么风险？']
  },
  'Pp/Ppk':{
    focus:'用总体波动评价一段期间的实际过程绩效，并与Cp/Cpk的组内短期波动口径区分。',
    formula:'Pp与Ppk使用总体标准差；Pp＝(USL－LSL)÷6s，Ppk取上下单侧绩效指数较小值。',
    caseText:'同一过程Cpk高而Ppk低，可能说明长期存在批次、班次或漂移波动，应查找分层差异，不能只用短期样本证明长期能力。',
    questions:['Ppk与Cpk的标准差口径有什么区别？','长期波动被掩盖时应怎样分层分析？']
  },
  'GR&R':{
    focus:'确认量具和人员造成的测量变差是否足以支持产品与过程判定。',
    formula:'按适用MSA方法评价重复性、再现性及总量具变差占比，同时检查分辨力、偏倚、线性与稳定性要求。',
    caseText:'三名检验员对10个样件重复测量，若人员间差异明显，应先统一测量方法和夹持基准，再讨论过程能力。',
    questions:['量具校准合格是否等于GR&R一定合格？','测量系统不可靠时计算Cpk会发生什么？']
  },
  'PPM/DPPM':{
    focus:'把不良数量标准化为百万分比，便于跨批量比较，但须区分不良品与缺陷数口径。',
    formula:'不良品PPM＝不良品数÷总检验数×1,000,000；缺陷DPPM须明确每单位机会数及客户口径。',
    caseText:'检验20000件发现4件不良，不良品PPM＝200。若一件含多个缺陷，不得在未说明口径时把缺陷数直接当不良品数。',
    questions:['一件产品有两个缺陷时，PPM分子按1还是2？取决于什么？','小样本PPM波动大时应如何解释？']
  },
  'Plan Attainment':{
    focus:'评价计划数量是否按既定日期和范围完成，同时真实标识超产、欠产与结单。',
    formula:'计划达成率＝实际合格完成量÷计划量×100%。应同步显示欠产量、超产量和是否满足订单交期，不能只看百分比。',
    caseText:'当日计划100件、实际91件，达成率91%，状态应为欠产9件；若次日补齐，须滚动冲减后续尾单计划并保留原日欠产事实。',
    questions:['当天欠产、次日补齐后，原日是否可改为100%？','超产为什么需要同步调整后续计划？']
  },
  'EOQ':{
    focus:'在需求较稳定的假设下平衡订购成本与库存持有成本，给出经济批量参考。',
    formula:'EOQ＝√(2DS÷H)，D为期间需求量，S为每次订购成本，H为单位期间持有成本。',
    caseText:'若需求、交期或价格阶梯波动明显，应把EOQ作为参考并结合MOQ、保质期、资金和供应风险修正。',
    questions:['EOQ模型最关键的稳定性假设有哪些？','MOQ大于EOQ时应进一步评估什么？']
  },
  'ROP':{
    focus:'根据补货提前期需求和安全库存确定再次下单的库存触发点。',
    formula:'ROP＝平均需求率×补货提前期＋安全库存。需求率和提前期必须使用一致时间单位。',
    caseText:'日均需求100件、补货提前期5天、安全库存200件，则ROP为700件；库存位置降至该水平时触发补货。',
    questions:['供应提前期延长会怎样影响ROP？','在途库存是否计入库存位置，应由什么规则决定？']
  },
  'PDCA':{
    focus:'用计划、执行、检查、处置形成可验证的改善闭环。',
    caseText:'针对换型时间长，P阶段定义基线与目标，D阶段试行内外作业分离，C阶段复测验证，A阶段固化标准并确定下一轮问题。',
    questions:['没有改善前基线，C阶段会失去什么？','A阶段除了“结案”还必须做什么？']
  },
  'VSM':{
    focus:'以产品族为对象同时绘制物流与信息流，用LT、VAT和WIP识别端到端改善机会。',
    caseText:'某座椅开关价值流显示加工仅数十分钟、总交付却需数天，未来态优先压缩批量、等待和信息延迟，而非只削减单工位动作。',
    questions:['VSM为什么必须选定产品族？','现状图的数据应来自会议估计还是现场事实？']
  },
  'SMED':{
    focus:'把停机换型活动分为内作业与外作业，优先外移、并行和标准化。',
    caseText:'某注塑换模由14小时降至6—7小时：先录像分解作业，再把准备工作外移、并行连接与点检，最后固化换模清单。',
    questions:['SMED第一步为什么不是直接购买快换装置？','什么叫内作业转外作业？']
  },
  'FMEA':{
    focus:'在问题发生前识别失效链、现行控制和改进优先级，并与设计、过程和控制计划联动。',
    caseText:'某铆压工序识别“误触发导致伤害”失效，团队从严重度、发生原因和探测控制评估风险，增加防呆并验证后同步PFMEA与控制计划。',
    questions:['FMEA是否应在量产问题发生后才启动？','措施完成后需要更新哪些评分与控制文件？']
  },
  '8D':{
    focus:'针对复杂或客户问题，以团队方式完成围堵、根因、纠正、验证和防再发。',
    caseText:'客户反馈间歇性功能不良后，团队先隔离风险批次，再用复现与试验验证根因；未验证前不能把经验判断写成D4根因。',
    questions:['D3围堵措施能否直接替代D5永久措施？','根因和漏出原因为什么都要验证？']
  },
  '5Why':{
    focus:'沿事实因果链连续追问，找到可控制的系统根因，而非把责任停在“人员疏忽”。',
    caseText:'漏检不是简单归因为员工不认真，应继续追问作业标准、检具、防错、培训和审核机制为何未能预防或发现。',
    questions:['是否必须机械地问满五次？','为什么“员工粗心”通常不是充分根因？']
  },
  'ERP':{
    focus:'统一订单、计划、采购、库存、生产和财务等企业资源数据，是业务主干而非现场控制万能系统。',
    caseText:'ERP排产前必须确保编码、BOM、库存、提前期和工单规则准确；若实绩不回写，系统库存与计划将持续失真。',
    questions:['ERP上线为什么不能等同于管理流程已经改善？','主数据错误会沿哪些业务环节放大？']
  },
  'MES':{
    focus:'连接计划与车间执行，采集工单、人员、设备、物料、质量和追溯数据。',
    caseText:'MES接收ERP工单，在工位采集投料、过站、测试和异常，并把实绩回传；接口断开时须有补录与防重复机制。',
    questions:['MES与ERP的核心边界是什么？','离线补录为什么必须考虑防重与时间戳？']
  },
  'APS':{
    focus:'在物料、设备、人力、工艺和交期约束下生成有限能力排程，并支持异常重排。',
    caseText:'APS不能只读取订单数量，还要读取工艺路线、换型矩阵、设备能力、班次和物料齐套；否则“最优排程”无法执行。',
    questions:['无限产能计划与APS有限能力排程有何区别？','基础数据不准确时自动排程会带来什么风险？']
  },
  'ESD':{
    focus:'通过人员、设备、材料、环境和接地的系统控制，防止静电损伤电子产品。',
    caseText:'进入EPA区域前人员佩戴并点检防静电装备，台垫与接地按规定验证；“摸一下金属”不能替代受控的静电防护。',
    questions:['ESD损伤为什么可能在出货后才暴露？','防静电手环佩戴了是否等于控制有效？还需验证什么？']
  },
  'IPC-A-610':{
    focus:'按产品等级和客户要求判定电子组件的可接受性，统一焊接与装配外观标准。',
    caseText:'同一焊点在不同产品等级下判定可能不同；检验前必须确认适用等级、客户特殊要求和受控版本。',
    questions:['IPC-A-610的判定能否脱离产品等级？','客户特殊要求与通用标准冲突时应如何处理？']
  }
};

function clean(value){return String(value||'').replace(/\s+/g,' ').trim();}
function esc(value){return clean(value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function field(card,selector){var el=card.querySelector(selector);return clean(el?el.textContent:'');}
function application(card){var p=Array.prototype.slice.call(card.querySelectorAll('p')).filter(function(node){return !node.classList.contains('term-formula');})[0];return clean(p?p.textContent:'').replace(/^应用场景[：:]\s*/,'');}
function formula(card){var p=card.querySelector('.term-formula');return clean(p?p.textContent:'').replace(/^计算公式[／/]判定[：:]\s*/,'');}
function category(card){var p=card.getAttribute('data-profile');if(p&&profiles[p])return p;var section=card.closest('.module-section[id]');return section&&profiles[section.id]?section.id:'brand';}
function lesson(card,index){
  var code=field(card,'.term-code'),en=field(card,'.term-en'),zh=field(card,'h3'),app=application(card),cat=category(card),profile=profiles[cat],extra=special[code]||{},shownFormula=extra.formula||formula(card);
  var focus=extra.focus||('正确理解“'+zh+'”的定义、适用边界和现场证据，并能把它用于实际问题。');
  var method=extra.method||profile.steps.map(function(step){return step.replace('{term}',zh);});
  var caseText=(extra.caseText||profile.caseText).replace(/\{term\}/g,zh+'（'+code+'）');
  var questions=extra.questions||[
    '请用自己的话说明“'+code+'”与“'+zh+'”的核心含义。',
    '在你的现场，哪一个具体问题最适合使用本术语？需要哪些事实或记录证明？',
    '若只有结论而没有原始数据、版本或责任记录，这项工作是否可以判定完成？为什么？'
  ];
  return{
    code:code,en:en,zh:zh,app:app,cat:cat,profile:profile,extra:extra,index:index,
    oplCode:'OPL-'+String(index+1).padStart(3,'0')+'-'+code.toUpperCase().replace(/&/g,'-AND-').replace(/[^A-Z0-9\u4e00-\u9fff]+/g,'-').replace(/^-|-$/g,''),
    definition:code+'（'+en+'），中文为“'+zh+'”。'+app,
    goal:focus+' 培训后，学员应能说清定义、指出适用边界、完成一次现场应用并保留验证证据。',
    problem:extra.problem||profile.problem,
    boundary:extra.boundary||profile.boundary,
    shownFormula:shownFormula||('本术语不以单一公式为核心。判定重点是：输入真实、过程受控、输出明确、结果有证据，并符合“'+zh+'”的适用要求。'),
    method:method,
    caseText:caseText,
    mistakes:extra.mistakes||profile.mistakes,
    owners:extra.owners||profile.owners,
    records:extra.records||profile.records,
    questions:questions
  };
}
function list(items){return'<ul>'+items.map(function(item){return'<li>'+esc(item)+'</li>';}).join('')+'</ul>';}
function steps(items){return'<ol>'+items.map(function(item){return'<li>'+esc(item)+'</li>';}).join('')+'</ol>';}
function block(num,title,body,wide,extraClass){return'<section class="term-opl-block'+(wide?' term-opl-wide':'')+(extraClass?' '+extraClass:'')+'"><h3><span class="term-opl-num">'+num+'</span>'+esc(title)+'</h3>'+body+'</section>';}
function buildModal(){
  var node=document.createElement('div');
  node.id='termOplModal';
  node.className='term-opl-modal qily-cn-terminology-modal';
  node.hidden=true;
  node.innerHTML='<div class="term-opl-backdrop" data-opl-close></div><article class="term-opl-dialog" role="dialog" aria-modal="true" aria-labelledby="termOplTitle"><aside class="term-opl-running term-opl-running-head" aria-hidden="true"><strong>QilyLean｜启力精益</strong><span>启精益之智，聚企业之力。让改善形成体系，让精益产生力量。</span></aside><aside class="term-opl-running term-opl-running-foot" aria-hidden="true"><span>精益制造经验分享 · 单点培训知识库</span><span>qilylean.cn · 来源可追溯</span></aside><header class="term-opl-header"><div class="term-opl-brandbar"><strong>QilyLean｜启力精益</strong><span>启精益之智，聚企业之力。让改善形成体系，让精益产生力量。</span></div><p class="term-opl-kicker" id="termOplKicker"></p><h2 class="term-opl-title" id="termOplTitle"></h2><p class="term-opl-subtitle" id="termOplSubtitle"></p><p class="term-opl-theme">主题：数智化工厂建设 · 目视化项目交付 · 精益改善落地</p><button class="term-opl-close" type="button" aria-label="关闭课件" data-opl-close>×</button></header><div class="term-opl-toolbar"><button type="button" data-opl-prev>← 上一项</button><button type="button" data-opl-next>下一项 →</button><button type="button" data-opl-link>复制课件链接</button><button type="button" data-opl-print>下载 / 保存PDF</button><span class="term-opl-page" id="termOplPage"></span></div><div class="term-opl-content" id="termOplContent"></div></article>';
  document.querySelector('.mirror-article-fidelity').appendChild(node);
  return node;
}
function toast(message){
  var node=document.getElementById('termOplToast');
  if(!node){node=document.createElement('div');node.id='termOplToast';node.className='term-opl-toast';document.querySelector('.mirror-article-fidelity').appendChild(node);}
  node.textContent=message;node.classList.add('show');
  clearTimeout(toast.timer);toast.timer=setTimeout(function(){node.classList.remove('show');},1900);
}
function copyText(text){
  if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(text);
  return new Promise(function(resolve,reject){
    var area=document.createElement('textarea');area.value=text;area.setAttribute('readonly','');area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();
    try{document.execCommand('copy')?resolve():reject();}catch(error){reject(error);}area.remove();
  });
}

var standalone=false,modal=buildModal(),current=-1,lastFocus=null;
var contentNode=modal.querySelector('#termOplContent'),titleNode=modal.querySelector('#termOplTitle'),subtitleNode=modal.querySelector('#termOplSubtitle'),kickerNode=modal.querySelector('#termOplKicker'),pageNode=modal.querySelector('#termOplPage');
var prevButton=modal.querySelector('[data-opl-prev]'),nextButton=modal.querySelector('[data-opl-next]');

cards.forEach(function(card,index){
  card.setAttribute('data-opl-index',index);
  var actions=document.createElement('div'),code=field(card,'.term-code');actions.className='term-opl-actions';
  actions.innerHTML='<a class="term-opl-open" href="'+location.pathname+'?opl='+encodeURIComponent(code)+'" target="_blank" rel="noopener" data-opl-index="'+index+'"><span class="term-opl-open-label-v9">打开独立培训课件</span></a>';
  card.appendChild(actions);
});

function canonicalLink(data){
  return location.origin+location.pathname+'?opl='+encodeURIComponent(data.code);
}
function render(index){
  current=Math.max(0,Math.min(cards.length-1,index));
  var data=lesson(cards[current],current);
  kickerNode.textContent='ONE POINT LESSON · '+data.oplCode;
  titleNode.textContent=data.code+'｜'+data.zh;
  subtitleNode.textContent=data.en+' · '+data.profile.label;
  pageNode.textContent='第 '+(current+1)+'／'+cards.length+' 项';
  prevButton.disabled=current===0;nextButton.disabled=current===cards.length-1;
  var checks=data.questions.map(function(q,i){return'<div class="term-opl-question"><strong>Q'+(i+1)+'：</strong>'+esc(q)+'</div>';}).join('');
  var answer='回答应包含准确含义、适用边界、现场例子和验证证据；不得只复述缩写。涉及公式时，必须先说明统计对象、周期、分母和数据来源。';
  contentNode.innerHTML=
    '<div class="term-opl-meta">'+
      '<div class="term-opl-meta-item"><span class="term-opl-meta-label">课件编号</span><span class="term-opl-meta-value">'+esc(data.oplCode)+'</span></div>'+
      '<div class="term-opl-meta-item"><span class="term-opl-meta-label">术语代码</span><span class="term-opl-meta-value">'+esc(data.code)+'</span></div>'+
      '<div class="term-opl-meta-item"><span class="term-opl-meta-label">英文全称</span><span class="term-opl-meta-value">'+esc(data.en)+'</span></div>'+
      '<div class="term-opl-meta-item"><span class="term-opl-meta-label">培训类型</span><span class="term-opl-meta-value">'+esc(data.profile.label)+'</span></div>'+
    '</div>'+
    '<div class="term-opl-objective"><strong>培训目标：</strong>'+esc(data.goal)+'</div>'+
    '<div class="term-opl-grid">'+
      block('1','核心定义','<p>'+esc(data.definition)+'</p>',true)+
      block('2','解决什么现场问题','<p>'+esc(data.problem)+'</p>',false)+
      block('3','适用场景与边界','<p>'+esc(data.boundary)+'</p>',false)+
      block('4','公式、口径与数据来源','<p class="term-opl-formula">'+esc(data.shownFormula)+'</p>',true)+
      block('5','标准实施步骤',steps(data.method),true)+
      block('6','制造现场案例','<p class="term-opl-case">'+esc(data.caseText)+'</p>',true)+
      block('7','常见误区与异常判断',list(data.mistakes),false)+
      block('8','责任与输出记录','<p><strong>责任：</strong>'+esc(data.owners)+'</p><p style="margin-top:9px"><strong>输出：</strong>'+esc(data.records)+'</p>',false)+
      block('9','培训确认题','<div class="term-opl-check">'+checks+'</div><details class="term-opl-answer"><summary>展开讲师确认要点</summary><p>'+esc(answer)+'</p></details>',true)+
    '</div>'+
    '<section class="term-opl-contact-card qily-cn-opl-knowledge-card" aria-label="QilyLean制造知识与实践分享">'+
      '<div class="term-opl-contact-copy"><h3>QilyLean｜启力精益 · 制造知识与实践分享</h3><p>精益生产管理 · 工业工程IE · PQCD改善 · 数智化工厂规划 · 目视化实践</p><p class="term-opl-contact-lines">本站：<a href="/">qilylean.cn</a><br>知识索引：<a href="/knowledge/">制造管理知识索引</a><br>精选简报：<a href="/briefs/">公开工程实践与经验分享</a></p></div>'+
      '<a class="term-opl-qr" href="/"><img src="/assets/qily-cn-home-code.svg" alt="扫码访问中国站知识首页" decoding="async" loading="lazy"><span>扫码访问中国站</span></a>'+
      '<div class="term-opl-qr"><img class="wx-qr-image" src="/assets/contact/qilylean-wechat-qr.png?v=acdd28c0e086" alt="QilyLean微信二维码" decoding="async" loading="lazy"><span>扫码微信交流</span></div>'+
    '</section>'+
    '<div class="term-opl-footer"><span>QilyLean｜启力精益 · 单点培训知识库 · 来源可追溯</span><span>中国站知识档案：https://qilylean.cn/</span></div>';
  contentNode.scrollTop=0;
  document.title=data.code+'｜'+data.zh+'｜单点培训课件｜QilyLean';
  var canonical=document.querySelector('link[rel="canonical"]');if(canonical)canonical.href=canonicalLink(data);
  var url=new URL(location.href);
  if(standalone){url.search='';url.searchParams.set('opl',data.code);url.hash='';}
  else{url.searchParams.set('term',data.code);url.searchParams.set('opl','1');url.hash=cards[current].id;}
  history.replaceState(null,'',url.pathname+url.search+url.hash);
}
function open(index,trigger){
  lastFocus=trigger||document.activeElement;
  modal.hidden=false;document.body.classList.add('term-opl-locked');
  if(standalone)document.body.classList.add('term-opl-standalone');
  render(index);
  requestAnimationFrame(function(){modal.querySelector('.term-opl-close').focus();});
}
function close(){
  if(modal.hidden)return;
  if(standalone){location.href=location.pathname;return;}
  modal.hidden=true;document.body.classList.remove('term-opl-locked');
  var url=new URL(location.href);url.searchParams.delete('opl');history.replaceState(null,'',url.pathname+url.search+url.hash);
  if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();
}

document.addEventListener('click',function(event){
  var button=event.target.closest('.term-opl-open');
  if(!button||button.tagName==='A')return;
  event.preventDefault();event.stopPropagation();
  open(Number(button.getAttribute('data-opl-index')),button);
},true);
modal.addEventListener('click',function(event){
  if(event.target.closest('[data-opl-close]')){close();return;}
  if(event.target.closest('[data-opl-prev]')){render(current-1);return;}
  if(event.target.closest('[data-opl-next]')){render(current+1);return;}
  if(event.target.closest('[data-opl-print]')){window.print();return;}
  if(event.target.closest('[data-opl-link]')){
    copyText(canonicalLink(lesson(cards[current],current))).then(function(){toast('课件链接已复制');}).catch(function(){toast('复制失败，请从地址栏复制');});
    return;
  }
});
document.addEventListener('keydown',function(event){
  var key=String(event.key||'').toLowerCase();
  if(modal.hidden)return;
  if(event.key==='Escape'){event.preventDefault();close();}
  if(event.key==='ArrowLeft'&&!event.target.matches('input,textarea')){event.preventDefault();if(current>0)render(current-1);}
  if(event.key==='ArrowRight'&&!event.target.matches('input,textarea')){event.preventDefault();if(current<cards.length-1)render(current+1);}
});

var params=new URLSearchParams(location.search),oplRequest=clean(params.get('opl'));
if(oplRequest){
  standalone=true;
  var requested=(oplRequest==='1'?clean(params.get('term')):oplRequest).toLocaleLowerCase('zh-CN');
  var index=cards.findIndex(function(card){return field(card,'.term-code').toLocaleLowerCase('zh-CN')===requested||field(card,'h3').toLocaleLowerCase('zh-CN')===requested;});
  if(index>=0)open(index,null);
  else location.replace(location.pathname);
}
})();


;
(function () {
  'use strict';

  var VERSION = '20260801-project-delivery-v1';
  var TERMINOLOGY_PATH = /^\/archive\/knowledge\/terminology\/$/i;

  if (!TERMINOLOGY_PATH.test(location.pathname || '')) return;

  function clean(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function findRaciCard() {
    return Array.prototype.find.call(document.querySelectorAll('[data-term-card]'), function (card) {
      var code = card.querySelector('.term-code');
      return clean(code && code.textContent).toUpperCase() === 'RACI';
    });
  }

  function patchRaciCard() {
    var card = findRaciCard();
    if (!card || card.getAttribute('data-project-delivery-sync') === VERSION) return;

    card.setAttribute('data-project-delivery-sync', VERSION);
    card.setAttribute(
      'data-keywords',
      clean((card.getAttribute('data-keywords') || '') + ' 项目管理 工程项目 交付闭环 里程碑 阶段门 责任矩阵 Responsible Accountable Consulted Informed')
    );

    var formula = card.querySelector('.term-formula');
    if (!formula) {
      formula = document.createElement('p');
      formula.className = 'term-formula';
      var firstApplication = Array.prototype.find.call(card.querySelectorAll('p'), function (node) {
        return !node.classList.contains('term-formula');
      });
      card.insertBefore(formula, firstApplication || card.querySelector('.term-opl-actions'));
    }
    formula.innerHTML = '<strong>判定口径：</strong>每个交付项只能设置一名A（最终负责者）；可以有多名R（执行者），C必须在关键决策前被征询，I应在决策或状态变化后及时知会。';

    var application = Array.prototype.find.call(card.querySelectorAll('p'), function (node) {
      return !node.classList.contains('term-formula');
    });
    if (application) {
      application.innerHTML = '<strong>应用场景：</strong>用于工程项目、NPI、设备／自动化、数字化、布局及改善项目中，把交付包、里程碑、验收证据和收益责任落实到具体角色；同一交付项不得出现多名A，也不得用“共同负责”掩盖最终责任。';
    }
  }

  function setBlock(block, html) {
    if (!block) return;
    var heading = block.querySelector('h3');
    block.innerHTML = (heading ? heading.outerHTML : '') + html;
  }

  function findBlock(content, title) {
    return Array.prototype.find.call(content.querySelectorAll('.term-opl-block'), function (block) {
      var heading = block.querySelector('h3');
      return clean(heading && heading.textContent).indexOf(title) >= 0;
    });
  }

  function patchRaciLesson() {
    var modal = document.getElementById('termOplModal');
    var content = document.getElementById('termOplContent');
    var title = document.getElementById('termOplTitle');
    if (!modal || !content || !title) return;
    if (clean(title.textContent).indexOf('RACI｜') !== 0) return;
    if (content.querySelector('[data-raci-project-delivery-patch="' + VERSION + '"]')) return;

    var subtitle = document.getElementById('termOplSubtitle');
    if (subtitle) subtitle.textContent = 'Responsible / Accountable / Consulted / Informed · 工程项目交付责任矩阵';

    var theme = modal.querySelector('.term-opl-theme');
    if (theme) theme.textContent = '主题：工程项目交付闭环 · 里程碑责任 · 风险与收益验证';

    var objective = content.querySelector('.term-opl-objective');
    if (objective) {
      objective.innerHTML = '<strong>培训目标：</strong>能够围绕一个真实工程项目，按交付包和里程碑正确区分R、A、C、I，确保每项成果只有一名最终A责任人，并把责任落实到风险处理、验收证据、收益复核和标准移交。';
    }

    setBlock(findBlock(content, '核心定义'), '<p><strong>R（Responsible）执行：</strong>完成具体工作并提交证据；<strong>A（Accountable）最终负责：</strong>对交付结果、放行和升级负责；<strong>C（Consulted）协商：</strong>在关键决策前提供专业意见；<strong>I（Informed）知会：</strong>在状态或决策变化后及时获知。RACI必须绑定明确交付物，不能只绑定模糊活动。</p>');

    setBlock(findBlock(content, '解决什么现场问题'), '<p>解决跨部门项目中“都参加、没人负责”“开会很多、决策无人签字”“任务完成但验收、收益和移交无人承接”等问题，使需求、方案、试运行、量产／正式运行、验收及收益复核各阶段责任清晰。</p>');

    setBlock(findBlock(content, '适用场景与边界'), '<p>适用于工程项目、NPI、设备与自动化、数字化系统、厂房／产线布局、降本及精益改善。每个交付项只能有一名A；多名R可以并行执行，但必须明确各自输出。C应在决策前参与，I不承担审批责任。RACI不能替代项目计划、专业标准或管理授权。</p>');

    setBlock(findBlock(content, '公式、口径与数据来源'), '<p class="term-opl-formula"><strong>核心判定：</strong>交付项＝明确输出＋唯一A＋一个或多个R＋必要C／I＋期限＋验收证据。没有唯一A、没有验收证据或责任只写“相关部门”的项目，不得判定责任闭环。</p>');

    setBlock(findBlock(content, '标准实施步骤'), '<ol><li>按项目范围和里程碑拆分可验收交付包，不按“跟进、协调、配合”等模糊动作拆分。</li><li>列出项目负责人、PE、IE、NPI、ME、IT、质量、PMC、制造、采购、财务及使用部门等真实角色。</li><li>先为每个交付项指定唯一A，由其承担结果、决策和异常升级责任。</li><li>再指定完成工作并提交证据的R；多名R必须分别写清输出。</li><li>明确哪些角色需在方案、变更、验收和收益口径确定前作为C参与。</li><li>明确哪些角色需在状态、风险、决策和版本变化后作为I及时知会。</li><li>在每次里程碑评审中核对RACI与实际执行是否一致；组织、范围或基线变化时同步更新。</li></ol>');

    setBlock(findBlock(content, '制造现场案例'), '<p class="term-opl-case">某自动化装配项目在“试运行放行”里程碑中，由项目经理担任A；设备工程、PE、IE和供应商分别作为R，提交安全、节拍、质量、稳定性和文件证据；质量、制造及使用部门作为C参与放行评审；PMC、采购和财务作为I同步状态。若节拍达标但安全联锁、SOP或维护移交未完成，A不得批准进入正式运行。</p>');

    setBlock(findBlock(content, '常见误区与异常判断'), '<ul><li>同一交付项设置两名或多名A，最终出现相互等待。</li><li>把部门名称写成责任人，未落实到具体岗位或角色。</li><li>所有参与者都标R，实际交付物、接口和完成标准不清。</li><li>把I当成审批人，或在决策完成后才征询本应作为C的专业部门。</li><li>RACI只在立项时填写，范围、人员或里程碑变化后不更新。</li><li>任务被勾选完成，但验收证据、收益复核和使用部门移交没有A承接。</li></ul>');

    setBlock(findBlock(content, '责任与输出记录'), '<p><strong>责任：</strong>项目负责人维护RACI并组织复核；各交付项A对结果和放行负责；R按计划提交可核验输出；C／I按约定接口参与。</p><p style="margin-top:9px"><strong>输出：</strong>项目章程或任务书、交付包清单、里程碑计划、RACI矩阵、风险／问题／变更台账、评审纪要、验收证据、收益复核及标准移交记录。</p>');

    setBlock(findBlock(content, '培训确认题'), '<div class="term-opl-check"><div class="term-opl-question"><strong>Q1：</strong>为什么一个交付项只能设置一名A？</div><div class="term-opl-question"><strong>Q2：</strong>R与A分别对什么负责，能否由同一角色兼任？</div><div class="term-opl-question"><strong>Q3：</strong>C与I的参与时点有什么区别？</div><div class="term-opl-question"><strong>Q4：</strong>请为一个当前项目的下一里程碑列出交付物、A、R、C、I和验收证据。</div></div><details class="term-opl-answer"><summary>展开讲师确认要点</summary><p>回答必须说明：A对最终结果、放行和升级负责且原则上唯一；R完成具体工作并提交证据，A可在小型任务中兼任R；C在决策前征询，I在状态或决策变化后知会；RACI必须落到真实交付物、期限和验收证据。</p></details>');

    var source = document.createElement('div');
    source.setAttribute('data-raci-project-delivery-patch', VERSION);
    source.className = 'term-opl-objective';
    source.style.marginTop = '18px';
    source.innerHTML = '<strong>内容同步：</strong>本课件已依据2026年8月1日《工程项目不是“做完”：用里程碑、风险、资源与收益形成交付闭环》更新，重点强化“唯一A责任人、里程碑放行、验收证据与收益移交”。';
    var contact = content.querySelector('.term-opl-contact-card');
    content.insertBefore(source, contact || null);
  }

  function initialize() {
    patchRaciCard();
    patchRaciLesson();

    var modal = document.getElementById('termOplModal');
    if (modal && window.MutationObserver) {
      new MutationObserver(function () {
        patchRaciLesson();
      }).observe(modal, { childList: true, subtree: true, characterData: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();

;
(function () {
  'use strict';

  var VERSION = '20260828-knowledge-asset-v2';
  var path = location.pathname || '/';
  var isDaily = /^\/qilylean\/daily\/\d{4}-\d{2}-\d{2}\.html$/i.test(path);
  var isTerminology = /^\/archive\/knowledge\/terminology\/$/i.test(path);
  if (!isDaily && !isTerminology) return;

  var TERM_ORDER = [
    'VSM','SMED','OEE','PDCA','ECRS','5WHY','FMEA','PFMEA','SPC','MSA','GR&R','POKA-YOKE',
    'CT','TT','LT','WIP','UPH','UPPH','PCE','FPY','Cpk','MTBF','MTTR','NPI','APQP','PPAP',
    'RACI','PILOT','MES','ERP','APS','ANDON','WMS','QMS','CMMS','TPM','SOP','DOE'
  ];

  var TERM_META = {
    'VSM': {label:'价值流图', chain:['LT','WIP','PCE','TT'], service:'/methods/', project:'/notes/'},
    'SMED': {label:'快速换型', chain:['ECRS','CT','OEE'], service:'/methods/', project:'/notes/'},
    'OEE': {label:'设备综合效率', chain:['MTBF','MTTR','TPM'], service:'/methods/', project:'/notes/'},
    'PDCA': {label:'计划-执行-检查-处置', chain:['PILOT','RACI'], service:'/methods/', project:'/notes/'},
    'ECRS': {label:'取消-合并-重排-简化', chain:['CT','UPPH','SMED'], service:'/methods/', project:'/notes/'},
    '5WHY': {label:'五个为什么', chain:['PDCA','FMEA'], service:'/methods/', project:'/notes/'},
    'FMEA': {label:'失效模式与影响分析', chain:['APQP','PPAP','SPC'], service:'/methods/', project:'/notes/'},
    'PFMEA': {label:'过程失效模式与影响分析', chain:['APQP','PPAP','SPC'], service:'/methods/', project:'/notes/'},
    'SPC': {label:'统计过程控制', chain:['Cpk','MSA','FPY'], service:'/methods/', project:'/notes/'},
    'MSA': {label:'测量系统分析', chain:['GR&R','SPC','Cpk'], service:'/methods/', project:'/notes/'},
    'GR&R': {label:'量具重复性与再现性', chain:['MSA','SPC'], service:'/methods/', project:'/notes/'},
    'POKA-YOKE': {label:'防错', chain:['FPY','FMEA'], service:'/methods/', project:'/notes/'},
    'CT': {label:'周期时间', chain:['TT','UPPH','WIP'], service:'/methods/', project:'/notes/'},
    'TT': {label:'客户需求节拍', chain:['CT','UPPH','WIP'], service:'/methods/', project:'/notes/'},
    'LT': {label:'交付周期', chain:['VSM','WIP','PCE'], service:'/methods/', project:'/notes/'},
    'WIP': {label:'在制品', chain:['LT','VSM','PCE'], service:'/methods/', project:'/notes/'},
    'UPH': {label:'每小时产出', chain:['CT','TT','UPPH'], service:'/methods/', project:'/notes/'},
    'UPPH': {label:'单位人时产出', chain:['CT','TT','ECRS'], service:'/methods/', project:'/notes/'},
    'PCE': {label:'流程效率', chain:['VSM','LT','WIP'], service:'/methods/', project:'/notes/'},
    'FPY': {label:'一次通过率', chain:['SPC','Cpk','POKA-YOKE'], service:'/methods/', project:'/notes/'},
    'Cpk': {label:'过程能力指数', chain:['SPC','MSA','FPY'], service:'/methods/', project:'/notes/'},
    'MTBF': {label:'平均故障间隔时间', chain:['MTTR','OEE','TPM'], service:'/methods/', project:'/notes/'},
    'MTTR': {label:'平均修复时间', chain:['MTBF','OEE','TPM'], service:'/methods/', project:'/notes/'},
    'NPI': {label:'新产品导入', chain:['APQP','PPAP','PILOT'], service:'/methods/', project:'/notes/'},
    'APQP': {label:'产品质量先期策划', chain:['PFMEA','PPAP','NPI'], service:'/methods/', project:'/notes/'},
    'PPAP': {label:'生产件批准程序', chain:['APQP','PFMEA','SPC'], service:'/methods/', project:'/notes/'},
    'RACI': {label:'责任矩阵', chain:['PILOT','PDCA'], service:'/methods/', project:'/notes/'},
    'PILOT': {label:'试运行 / 试点项目', chain:['PDCA','RACI','NPI'], service:'/methods/', project:'/notes/'},
    'MES': {label:'制造执行系统', chain:['ERP','APS','ANDON'], service:'/methods/', project:'/notes/'},
    'ERP': {label:'企业资源计划', chain:['MES','APS'], service:'/methods/', project:'/notes/'},
    'APS': {label:'高级计划与排程', chain:['ERP','MES','TT'], service:'/methods/', project:'/notes/'},
    'ANDON': {label:'安灯 / 异常响应', chain:['MES','OEE','MTTR'], service:'/methods/', project:'/notes/'},
    'WMS': {label:'仓储管理系统', chain:['ERP','MES'], service:'/methods/', project:'/notes/'},
    'QMS': {label:'质量管理系统', chain:['SPC','MSA','MES'], service:'/methods/', project:'/notes/'},
    'CMMS': {label:'设备维护管理系统', chain:['MTBF','MTTR','TPM'], service:'/methods/', project:'/notes/'},
    'TPM': {label:'全面生产维护', chain:['OEE','MTBF','MTTR'], service:'/methods/', project:'/notes/'},
    'SOP': {label:'标准作业程序', chain:['PDCA','NPI'], service:'/methods/', project:'/notes/'},
    'DOE': {label:'试验设计', chain:['SPC','Cpk','NPI'], service:'/methods/', project:'/notes/'},
    'DFMA': {label:'面向制造与装配的设计', chain:['DFM','DFA','DFX','BOM'], service:'/methods/', project:'/notes/'},
    'VA': {label:'价值分析', chain:['VE','BOM','COPQ'], service:'/methods/', project:'/notes/'},
    'VE': {label:'价值工程', chain:['VA','DFMA','APQP','BOM'], service:'/methods/', project:'/notes/'},
    'BOM-OPT': {label:'物料清单优化', chain:['BOM','EBOM','MBOM','VA'], service:'/methods/', project:'/notes/'},
    'PART-STD': {label:'零部件标准化', chain:['BOM','DFMA','EBOM'], service:'/methods/', project:'/notes/'},
    'FIXTURE': {label:'工装夹具设计', chain:['SMED','POKA-YOKE','DFMA'], service:'/methods/', project:'/notes/'},
    'AUTOMATION': {label:'自动化适配', chain:['SMED','ANDON','MES'], service:'/methods/', project:'/notes/'},
    'RELIABILITY': {label:'可靠性验证', chain:['FMEA','MTBF','MTTR','PPAP'], service:'/methods/', project:'/notes/'},
    'DESIGN-FEEDBACK': {label:'设计反馈', chain:['FMEA','DFMA','APQP','CAPA'], service:'/methods/', project:'/notes/'},
    'DIGITALIZATION': {label:'数智化', chain:['MES','ERP','IOT','BI'], service:'/methods/', project:'/notes/'}
  };

  var CASES = {
    'VSM':'教学案例：某装配产品日产需求明确，但从投料到成品跨越多个等待与批量周转点。团队先以CT、C/O、WIP、LT和信息流绘制现状图，再把瓶颈前库存、批量搬运和计划释放规则纳入未来态；改善验收不只看局部CT，而同步比较LT、WIP、准交率与PCE。',
    'SMED':'教学案例：某冲压换模长时间占用设备。先录像拆分停机内作业与可外置作业，再用ECRS把找工具、预热、备料、首件资料前置；随后用并行动作、快速定位和标准扭矩缩短停机窗口，并连续记录多次换型中位数，防止只拿一次最快成绩结案。',
    'OEE':'教学案例：某自动线OEE只有62%。分解A×P×Q后发现性能损失并非主因，最大损失来自故障等待和小停机。团队再按故障代码、MTBF、MTTR分层，先解决高频重复故障；改善后同时核对产出、良率和停机结构，避免只追求OEE单一数字。',
    'PDCA':'教学案例：某装配线连续欠产。P阶段先定义基线、目标和主要损失，D阶段在一条线做Pilot，C阶段比较CT、UPPH、欠产量与异常次数，A阶段把有效动作写入标准作业、点检和排产基础数据；若目标未达成，则带着新证据进入下一轮，而不是直接宣布结案。',
    'ECRS':'教学案例：某工位CT为42s而TT为36s。录像拆解后发现重复取放、跨步取料和两次扫码。团队依次检查Eliminate、Combine、Rearrange、Simplify，取消无价值转手、合并扫码、调整物料位置并简化夹具动作，使CT降到TT以内，再以连续班次实绩验证。',
    '5WHY':'教学案例：某产品反复漏装。第一问不能停在“员工粗心”，而继续追到作业步骤不可视、治具无到位检测、换线后首件确认未覆盖该特性。最终对策同时包含防错、标准更新和首件验证，验证指标采用漏装率与异常再发次数。',
    'FMEA':'教学案例：某新产品在试产阶段出现端子压接风险。团队把失效模式、后果、原因、现行控制与检测能力逐项展开，再将高风险项转成设备参数锁定、首件验证、抽检频次和防错要求；措施完成后重新评价风险，并把变更同步至Control Plan与SOP。',
    'PFMEA':'教学案例：某线束压接工序在NPI阶段存在高度偏差风险。PFMEA将失效模式与设备参数、端子批次、模具磨损、测量系统连接起来；高风险项目形成控制计划、点检频率和反应计划，并通过试产数据确认控制措施有效。',
    'SPC':'教学案例：某关键尺寸均值仍在规格内，但控制图连续出现趋势性漂移。团队没有等到超规才处理，而先核对MSA，再按设备、模腔、班次分层查找特殊原因；纠正后继续观察稳定性，并用Cpk判断稳定过程是否具备足够能力。',
    'MSA':'教学案例：某测量尺寸的生产数据波动很大。团队先做GR&R，发现不同检验员的操作方法贡献了显著变差；统一夹持位置、测量步骤与量具校验后再次分析，确认测量系统具备能力，再使用该数据评价过程Cpk。',
    'GR&R':'教学案例：三名检验员使用同一量具测量同一组零件，结果差异明显。通过重复性与再现性分析识别量具本体、操作员和交互影响，先改善测量方法和夹具，再决定该量具是否可用于过程判定。',
    'POKA-YOKE':'教学案例：某装配零件存在左右件混装。仅培训员工无法稳定消除错误，团队把左右件定位特征改成物理不可互换，并增加到位检测；验证时连续覆盖换线、换人和异常复位场景，确认错误无法流出。',
    'CT':'教学案例：某工位连续测得周期时间38s、41s、39s，而客户TT为36s。不能用平均值掩盖超节拍事实；先拆动作和损失，再用ECRS与工位重配降低稳定CT，并用多周期分布而非单次最快值确认结果。',
    'TT':'教学案例：班次可用时间25200s，客户需求700件，则TT为36s/件。现场每个关键工序都要与36s比较；若瓶颈CT为42s，即使员工一直忙碌也存在结构性欠产风险，必须先解决节拍差距或调整资源。',
    'WIP':'教学案例：某流程各工序单点效率都不差，但半成品堆积导致交付周期很长。团队按工序统计WIP与等待时间，并结合VSM定位批量释放和不平衡造成的库存；改善验证同时看WIP、LT和准交率，而不是只看某工序UPH。',
    'UPPH':'教学案例：某线8人每小时产出320件，UPPH=40件/人时。改善后虽然总产出仍为320件，但通过平衡与ECRS降至6人，则UPPH升至53.3件/人时；同时必须确认质量、节拍和人员负荷没有被透支。',
    'MTBF':'教学案例：某设备一周运行期间发生8次同类故障。团队按“实际运行时间÷故障次数”统一口径计算MTBF，并把重复故障按部件与故障代码Pareto；通过消除首要失效模式提高MTBF，而不是靠延长维修时间间隔掩盖问题。',
    'MTTR':'教学案例：某设备故障后平均40分钟恢复，其中真正维修仅12分钟，等待维修员、找备件和首件确认占28分钟。团队把MTTR拆成响应、诊断、资源等待、修复调试和质量验证，分别改善，避免把全部责任压给维修动作本身。',
    'NPI':'教学案例：某新产品试产时节拍达标但良率不稳定。NPI团队按BOM、工艺、PFMEA、治具、CT、人员培训和质量数据建立Gate清单，通过Pilot验证后再决定量产放行；未关闭的高风险项明确责任人与截止日期。',
    'APQP':'教学案例：某汽车电子新项目按阶段建立质量策划，从需求、设计、过程开发到产品/过程验证形成交付物；PFMEA、Control Plan、MSA、SPC与PPAP不是独立表格，而由同一风险逻辑贯穿并在变更时同步更新。',
    'PPAP':'教学案例：某零件准备量产前，团队按客户要求提交设计/过程记录、PFMEA、控制计划、MSA、尺寸结果、材料/性能试验及样件。资料齐全不等于批准，关键在于证据能证明产品和过程稳定满足要求。',
    'RACI':'教学案例：某自动化项目进入试运行放行，项目经理为唯一A；设备、PE、IE和供应商分别作为R提交安全、节拍、质量与文件证据；质量和制造作为C参与评审，PMC和采购作为I同步状态。未完成验收证据时A不得放行。',
    'PILOT':'教学案例：某线体准备全面推广单件流，不先全厂铺开，而选择一条代表线做Pilot。先锁定Baseline，再验证CT、WIP、UPPH、质量和异常响应；达到预设Gate后才复制，未达到则保留问题清单进入下一轮PDCA。',
    'MES':'教学案例：某工厂希望用MES解决报工失真。上线前先统一工序、BOM、工艺路线、标准工时、设备状态和异常编码，再通过试点线验证采集准确率、报工及时性和追溯完整性；否则只是把错误数据电子化。',
    'ERP':'教学案例：某企业ERP上线后排产仍失真，根因并非系统功能不足，而是BOM、标准工时、库存和订单状态口径不一致。团队先治理主数据和计划冻结规则，再核对计划—领料—报工—入库闭环。',
    'APS':'教学案例：某多品种工厂引入APS前，先确认订单优先级、设备/模具约束、换型时间、物料齐套、标准工时与日历能力。试排结果必须与现场可执行性对照，否则算法最优不等于制造可执行。',
    'ANDON':'教学案例：某线体设置Andon后报警很多但响应仍慢。团队定义异常类别、触发条件、责任层级、响应时限和关闭证据，并统计响应时间、重复异常和停线损失，使Andon从“亮灯”变成异常闭环机制。',
    'TPM':'教学案例：某关键设备故障频繁。团队把自主保全、专业保全、点检标准、备件与故障履历连接到OEE、MTBF、MTTR，通过重复故障Pareto确定优先级，并用稳定运行周期验证改善。',
    'DOE':'教学案例：某工艺质量受温度、压力、时间等多个参数影响。团队不逐个单因素试错，而设计有计划的试验组合识别主效应和交互作用，再用确认试验验证最佳参数窗口，并转入控制计划。'
  };

  function clean(v) { return String(v || '').replace(/\s+/g, ' ').trim(); }
  function esc(v) { return String(v || '').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

  function ensureStyle() {
    if (document.getElementById('qilyKnowledgeAssetV2Style')) return;
    var s = document.createElement('style');
    s.id = 'qilyKnowledgeAssetV2Style';
    s.textContent = [
      '.qily-ka2{margin:24px 0;border:1px solid #b9ced2;background:#f7fbfb;box-shadow:0 12px 32px rgba(15,75,90,.08)}',
      '.qily-ka2-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;border-top:4px solid #caa15f;border-bottom:1px solid #cbdcdf;background:#fff}',
      '.qily-ka2-kicker{color:#0f4b5a;font-size:12px;font-weight:950;letter-spacing:.11em}.qily-ka2-title{margin:5px 0 0;color:#0f4b5a;font-size:24px;line-height:1.3}',
      '.qily-ka2-badge{flex:0 0 auto;padding:7px 10px;border:1px solid #caa15f;background:#fff8e8;color:#765416;font-size:12px;font-weight:900}',
      '.qily-ka2-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:18px}',
      '.qily-ka2-card{padding:17px 18px;border:1px solid #d5e4e3;background:#fff;min-width:0}',
      '.qily-ka2-card h3{margin:0 0 9px;color:#0f4b5a;font-size:17px}.qily-ka2-card p{margin:0;color:#465b58;line-height:1.75}',
      '.qily-ka2-flow{grid-column:1/-1}.qily-ka2-flowline{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin-top:10px}',
      '.qily-ka2-node{padding:7px 10px;border:1px solid #9ebbc0;background:#eef7f7;color:#0f4b5a;font-weight:850}.qily-ka2-arrow{color:#c18d36;font-weight:950}',
      '.qily-ka2-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:11px}.qily-ka2-links a{padding:7px 10px;border:1px solid #178b94;color:#0f4b5a;background:#fff;text-decoration:none;font-weight:850}',
      '.qily-ka2-links a:hover{background:#0f4b5a;color:#fff}.qily-ka2-note{padding:0 18px 18px;color:#627978;font-size:12px;line-height:1.6}',
      '.term-opl-ka2-case{border-left:4px solid #caa15f!important}.term-opl-ka2-related{border-top:4px solid #178b94!important}',
      '@media(max-width:760px){.qily-ka2-head{align-items:flex-start;flex-direction:column}.qily-ka2-grid{grid-template-columns:1fr;padding:12px}.qily-ka2-flow{grid-column:auto}.qily-ka2-title{font-size:21px}}',
      '@media print{.qily-ka2{break-inside:avoid;box-shadow:none}.qily-ka2-links a{color:#0f4b5a}}'
    ].join('');
    document.head.appendChild(s);
  }

  function detectTerms(text) {
    var upper = (' ' + clean(text).toUpperCase() + ' ');
    return TERM_ORDER.filter(function(code){
      var needle = code.toUpperCase();
      if (needle === 'Cpk'.toUpperCase()) return /\bCPK\b/.test(upper);
      return upper.indexOf(needle) >= 0;
    }).slice(0, 5);
  }

  function termHref(code) {
    return '/archive/knowledge/terminology/?opl=' + encodeURIComponent(code);
  }

  function dailyEnhance() {
    if (document.querySelector('[data-qily-ka2-daily="'+VERSION+'"]')) return;
    var article = document.querySelector('article.post') || document.querySelector('.post') || document.querySelector('main');
    if (!article) return;
    var titleNode = article.querySelector('h1,h2');
    var title = clean(titleNode && titleNode.textContent) || '本期精选';
    var paragraphs = Array.prototype.map.call(article.querySelectorAll('p'), function(p){return clean(p.textContent);}).filter(Boolean);
    var lead = paragraphs[0] || clean(article.textContent).slice(0, 180);
    var terms = detectTerms(article.textContent);
    var primary = terms[0] || '';
    var primaryMeta = TERM_META[primary] || null;
    var caseText = CASES[primary] || ('教学案例：围绕“' + title + '”选择一个真实或代表性制造场景，先锁定Baseline与数据口径，再应用对应方法完成Pilot验证；至少同步核对PQCD、异常与标准化结果，未形成验证证据不得判定改善关闭。');
    var chain = primaryMeta ? [primary].concat(primaryMeta.chain || []) : terms;
    if (!chain.length) chain = ['现场事实','工程数据','改善动作','验证证据'];
    var related = terms.length ? terms : (primary ? [primary] : []);

    var box = document.createElement('section');
    box.className = 'qily-ka2';
    box.setAttribute('data-qily-ka2-daily', VERSION);
    box.innerHTML = '<div class="qily-ka2-head"><div><div class="qily-ka2-kicker">QILYLEAN · ENGINEERING DEEP DIVE</div><h2 class="qily-ka2-title">工程深读｜从观点进入数据、方法与验证</h2></div><div class="qily-ka2-badge">Knowledge Asset 2.0</div></div>' +
      '<div class="qily-ka2-grid">' +
      '<div class="qily-ka2-card"><h3>01｜核心判断</h3><p>' + esc(lead) + '</p></div>' +
      '<div class="qily-ka2-card"><h3>02｜工程判定口径</h3><p>先定义对象、时间窗、数据来源与Baseline，再比较目标与实绩。涉及工具应用时，必须把“为什么选该工具、输入数据是什么、输出证据是什么、何时判定关闭”写清；不能用单次最佳值替代稳定结果。</p></div>' +
      '<div class="qily-ka2-card term-opl-ka2-case"><h3>03｜工具应用案例</h3><p>' + esc(caseText) + '</p></div>' +
      '<div class="qily-ka2-card"><h3>04｜现场动作与验收</h3><p>建议按“事实确认 → 数据分层 → 工具选择 → Pilot → PQCD验证 → 标准化/系统固化”推进。验收至少保留前后基线、过程数据、异常记录、责任人与标准更新证据；涉及ERP/MES/APS时同步校验主数据与现场实绩。</p></div>' +
      '<div class="qily-ka2-card qily-ka2-flow"><h3>05｜相关知识链</h3><div class="qily-ka2-flowline">' + chain.map(function(code,i){return (i?'<span class="qily-ka2-arrow">→</span>':'') + '<span class="qily-ka2-node">'+esc((TERM_META[code]&&TERM_META[code].label)?code+'｜'+TERM_META[code].label:code)+'</span>';}).join('') + '</div>' +
      '<div class="qily-ka2-links">' + related.map(function(code){return '<a href="'+termHref(code)+'">OPL｜'+esc(code+(TERM_META[code]?' · '+TERM_META[code].label:''))+'</a>';}).join('') + '<a href="/notes/">代表项目</a><a href="/methods/">相关项目能力</a></div></div>' +
      '</div><div class="qily-ka2-note">说明：案例标注为教学案例时，仅用于方法训练与应用说明，不作为客户项目事实或商业成果声明；职业实践与项目数据仍以本站证据分级和公开页面为准。</div>';

    var anchor = article.querySelector('[data-daily-terminology-audit]') || article.querySelector('.quote');
    if (anchor) anchor.insertAdjacentElement('afterend', box); else article.appendChild(box);
  }

  function modalCode() {
    var title = document.getElementById('termOplTitle');
    var text = clean(title && title.textContent);
    return text ? text.split('｜')[0].trim().toUpperCase() : '';
  }

  function addOplBlocks() {
    var content = document.getElementById('termOplContent');
    if (!content) return;
    var code = modalCode();
    if (!code || content.getAttribute('data-qily-ka2') === VERSION + ':' + code) return;
    content.setAttribute('data-qily-ka2', VERSION + ':' + code);
    ensureStyle();

    var meta = TERM_META[code] || null;
    var existingCase = Array.prototype.find.call(content.querySelectorAll('.term-opl-block'), function(block){
      return /案例/.test(clean(block.querySelector('h3') && block.querySelector('h3').textContent));
    });
    var caseText = CASES[code] || ('教学案例：选择一个与“' + code + '”相关的现场问题，先建立Baseline与统一数据口径，再按本课方法实施Pilot；最终用PQCD、异常记录和标准化证据确认是否有效，避免把“做了动作”当成“完成改善”。');

    if (existingCase) {
      existingCase.classList.add('term-opl-ka2-case');
      var p = existingCase.querySelector('p');
      var old = clean(p && p.textContent);
      if (p && old.length < 90) p.textContent = caseText;
    } else {
      var caseBlock = document.createElement('section');
      caseBlock.className = 'term-opl-block term-opl-wide term-opl-ka2-case';
      caseBlock.innerHTML = '<h3><span class="term-opl-num">案</span>工具应用案例</h3><p class="term-opl-case">'+esc(caseText)+'</p>';
      var contact = content.querySelector('.term-opl-contact-card');
      content.insertBefore(caseBlock, contact || null);
    }

    if (!content.querySelector('.term-opl-ka2-related')) {
      var rel = document.createElement('section');
      rel.className = 'term-opl-block term-opl-wide term-opl-ka2-related';
      var chain = meta ? [code].concat(meta.chain || []) : [code];
      rel.innerHTML = '<h3><span class="term-opl-num">链</span>相关知识与项目实践</h3><div class="qily-ka2-flowline">'+chain.map(function(c,i){return (i?'<span class="qily-ka2-arrow">→</span>':'')+'<a class="qily-ka2-node" href="'+termHref(c)+'">'+esc(c+(TERM_META[c]?'｜'+TERM_META[c].label:''))+'</a>';}).join('')+'</div><div class="qily-ka2-links"><a href="/briefs/">精选简报</a><a href="/notes/">代表项目</a><a href="/methods/">相关项目能力</a></div><p style="margin-top:12px;color:#627978;font-size:13px">关联原则：仅展示与当前术语存在直接方法、数据、项目或系统关系的内容；引用关系变化时须同步更新。</p>';
      var contact2 = content.querySelector('.term-opl-contact-card');
      content.insertBefore(rel, contact2 || null);
    }
  }

  function terminologyEnhance() {
    ensureStyle();
    addOplBlocks();
    var modal = document.getElementById('termOplModal');
    if (modal && window.MutationObserver) {
      new MutationObserver(function(){ addOplBlocks(); }).observe(modal,{childList:true,subtree:true,characterData:true});
    }
  }

  ensureStyle();
  if (isDaily) dailyEnhance();
  if (isTerminology) terminologyEnhance();
})();

;
(function () {
  'use strict';

  var VERSION = '20260828-opl-header-v2';
  var TERMINOLOGY_PATH = /^\/archive\/knowledge\/terminology\/$/i;
  if (!TERMINOLOGY_PATH.test(location.pathname || '')) return;

  var THEMES = {
    lean: '主题：精益生产 · 工业工程IE · PQCD改善落地',
    ie: '主题：工业工程IE · 标准工时 · 产能与效率改善',
    engineering: '主题：NPI · 工程开发 · 量产验证与项目交付',
    quality: '主题：质量策划 · 过程能力 · 问题解决与防再发',
    production: '主题：PMC · 产能排程 · 物料与交付闭环',
    digital: '主题：ERP / MES / APS · 主数据 · 数智化工厂',
    manufacturing: '主题：制造工艺 · 设备可靠性 · 安全与质量',
    management: '主题：项目管理 · 责任机制 · 持续改善闭环',
    brand: '主题：制造运营 · 工程改善 · 精益赋能与数智固化'
  };

  var PURPOSE = {
    lean: '从现场事实、节拍与损失出发，形成可量化、可验证、可标准化的改善。',
    ie: '把时间、产能、人力与流程转换为可计算的工程决策基础。',
    engineering: '以版本、风险、验证证据和阶段门保证设计向稳定量产转换。',
    quality: '用统一判定口径、过程证据与防再发机制守住客户质量边界。',
    production: '把订单、物料、能力、排程和实绩连接成可执行的交付闭环。',
    digital: '先统一业务流程与主数据，再用系统固化现场真实业务闭环。',
    manufacturing: '让工艺、设备、文件、安全与质量要求在现场稳定执行并可追溯。',
    management: '把目标、责任、里程碑、风险和验收证据连接成项目闭环。',
    brand: '围绕制造问题建立事实基线，以工程方法验证改善并形成组织资产。'
  };

  function clean(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function codeFromTitle() {
    var title = document.getElementById('termOplTitle');
    return clean(title && title.textContent).split('｜')[0];
  }

  function currentCard(code) {
    if (!code) return null;
    var target = code.toLocaleLowerCase('zh-CN');
    return Array.prototype.find.call(document.querySelectorAll('[data-term-card]'), function (card) {
      var node = card.querySelector('.term-code');
      return clean(node && node.textContent).toLocaleLowerCase('zh-CN') === target;
    }) || null;
  }

  function domainOf(card) {
    var section = card && card.closest('.module-section[id]');
    var id = clean(section && section.id).toLowerCase();
    return THEMES[id] ? id : 'brand';
  }

  function apply() {
    var modal = document.getElementById('termOplModal');
    if (!modal || modal.hidden) return;
    var code = codeFromTitle();
    var card = currentCard(code);
    if (!card) return;
    var domain = domainOf(card);
    var theme = modal.querySelector('.term-opl-theme');
    if (theme) {
      if (theme.textContent !== THEMES[domain]) theme.textContent = THEMES[domain];
      theme.setAttribute('data-opl-header-domain', domain);
      theme.setAttribute('data-opl-header-version', VERSION);
    }

    var content = document.getElementById('termOplContent');
    if (!content) return;
    var objective = content.querySelector('.term-opl-objective');
    if (!objective || content.querySelector('[data-opl-purpose="' + VERSION + '"]')) return;
    var note = document.createElement('div');
    note.className = 'term-opl-objective term-opl-purpose-v2';
    note.setAttribute('data-opl-purpose', VERSION);
    note.innerHTML = '<strong>本课管理定位：</strong>' + PURPOSE[domain];
    objective.insertAdjacentElement('afterend', note);
  }

  function initialize() {
    var modal = document.getElementById('termOplModal');
    if (!modal) return;
    apply();
    if (window.MutationObserver) {
      var scheduled = false;
      new MutationObserver(function () {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(function () { scheduled = false; apply(); });
      }).observe(modal, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden'] });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();

;
(function () {
  'use strict';

  var VERSION = '20260903-5m2e-knowledge-v1';
  var TERMINOLOGY_PATH = /^\/archive\/knowledge\/terminology\/$/i;
  if (!TERMINOLOGY_PATH.test(location.pathname || '')) return;

  function clean(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function updateCount() {
    var total = document.querySelectorAll('[data-term-card]').length;
    var count = document.getElementById('termCount');
    if (count && total > 0) count.textContent = '共收录 ' + total + ' 项术语 · ' + total + ' 份单点培训课件';
    var meta = document.querySelector('meta[name="description"]');
    if (meta && total > 0) meta.setAttribute('content', String(meta.getAttribute('content') || '').replace(/\d+项中文诠释/, total + '项中文诠释'));
  }

  function ensureSponsorCard() {
    var exists = Array.prototype.some.call(document.querySelectorAll('[data-term-card]'), function (card) {
      var code = card.querySelector('.term-code');
      return clean(code && code.textContent).toLowerCase() === 'sponsor';
    });
    if (exists) { updateCount(); return; }

    var grid = document.querySelector('.term-grid');
    if (!grid) return;

    var card = document.createElement('article');
    card.className = 'term-card';
    card.id = 'term-sponsor';
    card.setAttribute('data-term-card', '');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-keywords', 'Sponsor Project Sponsor 项目发起人 项目主责高层 项目赞助人 高层支持 资源授权 里程碑评审 风险升级 跨部门协调 收益确认 项目池');
    card.innerHTML = [
      '<div class="term-code">Sponsor</div>',
      '<div class="term-en">Project Sponsor</div>',
      '<h3>项目发起人／项目主责高层</h3>',
      '<p class="term-formula"><strong>核心口径：</strong>Sponsor代表组织层面对项目进行授权与背书，负责确认项目价值、保障关键资源、主持或参与重大里程碑评审，并在跨部门障碍或重大风险超出项目经理权限时推动升级解决。</p>',
      '<p><strong>应用场景：</strong>用于A类客户交付、重大质量／安全、量产爬坡、自动化、降本、工厂规划及数智化项目。Sponsor不替代项目经理做日常计划，也不等同于“出资赞助人”；在制造企业中更适合解释为“项目发起人”或“项目主责高层”。</p>',
      '<p class="term-case-mini"><strong>应用案例：</strong>某自动化项目在SAT后出现跨部门安全与节拍争议，项目经理无法单独调配资源；Sponsor组织里程碑评审，明确安全红线、责任人、资源和再验证条件，证据齐套后再批准进入Pilot。</p>',
      '<div class="term-opl-actions"><a class="term-opl-open" href="/archive/knowledge/terminology/sponsor/">查看单点培训课件</a></div>'
    ].join('');
    grid.appendChild(card);
    updateCount();

    var params = new URLSearchParams(location.search || '');
    if (clean(params.get('term')).toLowerCase() === 'sponsor' || location.hash === '#term-sponsor') {
      setTimeout(function () {
        card.classList.add('term-focus');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 120);
    }
  }

  var SPECIFIC_CASES = {
    'VSM':'某装配产品实际增值加工约35分钟，而从领料到完工LT达到2.4天。团队用VSM把WIP、等待、搬运和信息触发点放在同一张图上，先对两处批量等待实施Pilot，再用同口径LT、WIP与PCE验证是否真正缩短交付周期。',
    'ECRS':'某人工工位CT为38秒，录像分解发现重复取放、转身和二次确认。先取消无必要动作、合并取放、重排物料位置，Pilot后CT降至32秒；连续多班复测后才更新标准作业。',
    'SMED':'某设备换型原需90分钟。团队录像拆分内外部作业，将备料、治具预调和参数准备外部化，并把可并行动作同步执行，Pilot换型降至55分钟；同时确认首件质量与安全，避免“只快不稳”。',
    'OEE':'某自动化线可动率88%、性能效率92%、质量率98%，OEE约79.3%。团队不把“OEE低”当根因，而是继续按停机、短停、降速和不良分层，用柏拉图锁定最大损失并逐项验证。',
    'UPPH':'某线8名直接人员生产7.5小时，合格产出480件，UPPH＝8件/人·小时。若另有支援工时、返工或停线，必须按统一口径纳入或单独披露，不能用隐藏投入制造虚假提升。',
    'UPH':'某线7.5小时合格产出600件，UPH＝80件/小时。改善后即使UPH提升，也需同时查看投入人数、FPY和WIP，避免用增加人力或堆积在制换取表面产出。',
    'TT':'某班可用生产时间420分钟、客户需求840件，TT＝30秒/件。若瓶颈CT持续34秒，团队必须通过ECRS、线平衡、并行或资源调整解决能力缺口，而不是修改TT迎合现状。',
    'CT':'某工位连续完成20件用时600秒，观察CT为30秒/件；客户TT为27秒/件。团队进一步分离正常循环与异常停机，确认3秒/件能力缺口来自固定作业还是波动损失。',
    'LT':'某产品实际加工只有20分钟，但从领料到入库经历2.5天。改善时优先调查排队、批量、等待和信息触发，而不是只在20分钟加工时间里继续压缩几秒动作。',
    'PCE':'某流程增值时间30分钟、总LT 600分钟，PCE为5%。团队先处理等待和WIP，使总LT下降，再评估是否值得继续压缩单工序动作。',
    'FPY':'投入1000件，首次通过960件，返工后又合格35件；FPY仍为96%，最终合格率可为99.5%。该案例用于提醒：返工后合格不能回填一次合格率。',
    'PDCA':'某工序不良率连续三周约3.2%。P阶段完成缺陷层别和根因验证，D阶段只在一条线试行参数与防错，C阶段连续多班复测至约1.4%，A阶段再更新控制文件并横向展开。',
    '5WHY':'某端子压接不良反复发生，最初被归因“员工操作”。逐层追问并核对点检、校验与参数记录后发现控制缺口，措施由人员提醒转为量具校验、参数锁定与首件确认。',
    'PFMEA':'某新产品试产存在连接器错插风险。团队把失效模式、后果、原因、现有预防和探测控制逐项核对，按适用FMEA规则确定优先级，新增结构防错和验证证据后再评价风险。',
    'RACI':'某跨部门试运行项目曾出现“都参与但没人最终拍板”。团队按交付包设置唯一A、明确R/C/I，并把安全、节拍、质量、文件等验收证据绑定里程碑后，异常升级与放行责任可追溯。',
    'PILOT':'某线体改善方案只先在一个班次、一个产品族运行，预设CT、FPY、WIP和安全红线；连续达到目标且无副作用后才扩大范围，未达标则回退并修正。',
    'GANTT':'某自动化项目把“设备跟进”拆成设计冻结、FAT、到厂、SAT、Pilot、验收等里程碑，每个节点绑定责任人、前置条件和证据，周会只聚焦偏差、风险和决策。',
    '5M2E':'某自动化工位出现间歇性停机，团队按5M2E逐项核查人员操作与培训、设备报警与保全、物料批次、工艺参数、测量／传感器校准、环境温湿度，以及电源、压缩空气与真空等能源条件，最终用数据锁定气压波动，并将供气阈值、点检与异常反应纳入标准。',
    'SPONSOR':'某自动化项目在SAT后出现安全、节拍与资源冲突，项目经理权限不足。Sponsor组织重大里程碑评审，明确风险红线、资源与再验证条件，证据齐套后再批准进入Pilot。'
  };

  var RELATIONS = {
    'VSM':[['/briefs/archive/2026-08-19/','精选简报｜精益交付与工程闭环'],['/notes/','代表项目｜价值流与交付改善'],['/methods/','改善方法｜精益与IE']],
    'ECRS':[['/briefs/archive/2026-08-19/','精选简报｜精益交付与工程闭环'],['/methods/','改善方法｜ECRS与现场改善'],['/notes/','代表项目｜工程改善证据']],
    'SMED':[['/briefs/archive/2026-08-25/','精选简报｜八大浪费与改善闭环'],['/archive/knowledge/smed-injection-mold-change/','专题｜注塑快速换模'],['/notes/','代表项目｜换型改善']],
    'OEE':[['/briefs/archive/2026-08-25/','精选简报｜八大浪费与改善闭环'],['/methods/','改善方法｜设备效率'],['/notes/','代表项目｜改善验证']],
    'PDCA':[['/archive/knowledge/pdca-gantt-milestone-opl/','专题｜PDCA × 甘特图里程碑'],['/briefs/archive/2026-08-19/','精选简报｜工程闭环'],['/notes/','代表项目｜闭环证据']],
    'RACI':[['/archive/knowledge/pdca-gantt-milestone-opl/','专题｜项目里程碑管理'],['/briefs/archive/2026-08-19/','精选简报｜精益交付'],['/methods/','相关项目能力']],
    'PILOT':[['/briefs/archive/2026-08-25/','精选简报｜从问题到标准固化'],['/briefs/archive/2026-08-19/','精选简报｜工程交付闭环'],['/notes/','代表项目｜试点验证']],
    '5M2E':[['/methods/','改善方法｜要因分析与现场改善'],['/notes/','代表项目｜问题诊断与改善验证'],['/briefs/','精选简报｜制造问题解决']],
    'SPONSOR':[['/archive/knowledge/pdca-gantt-milestone-opl/','专题｜项目里程碑管理'],['/briefs/archive/2026-08-19/','精选简报｜工程交付闭环'],['/methods/','相关项目能力']]
  };

  function ensureStyles(){
    if(document.getElementById('qilyOplKnowledgeAssetV2Styles'))return;
    var style=document.createElement('style');
    style.id='qilyOplKnowledgeAssetV2Styles';
    style.textContent=[
      '.term-case-mini{margin-top:10px;padding:11px 12px;border-left:4px solid #0f6f73;background:#f1f8f6;color:#365753;line-height:1.65}',
      '.qily-opl-relations{margin:18px 0;padding:18px;border:1px solid #cbdeda;border-radius:16px;background:linear-gradient(180deg,#fff,#f2f8f6)}',
      '.qily-opl-relations h3{margin:0 0 7px;color:#0f4b5a!important}',
      '.qily-opl-relations p{margin:0 0 12px;color:#55706d!important;line-height:1.65}',
      '.qily-opl-relation-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}',
      '.qily-opl-relation-grid a{padding:11px 12px;border:1px solid #d5e4e1;border-radius:11px;background:#fff;color:#0f5965!important;text-decoration:none;font-weight:800;line-height:1.45}',
      '.term-opl-case{border-left:5px solid #0f6f73!important;background:linear-gradient(135deg,#f7fbfa,#eef7f4)!important}',
      '@media(max-width:760px){.qily-opl-relation-grid{grid-template-columns:1fr}}'
    ].join('');
    document.head.appendChild(style);
  }

  function currentCode(){
    var title=document.getElementById('termOplTitle');
    var text=clean(title&&title.textContent);
    if(!text)return '';
    return text.split('｜')[0].split('|')[0].trim().toUpperCase();
  }

  function findBlock(content,label){
    return Array.prototype.find.call(content.querySelectorAll('.term-opl-block'),function(block){
      var h=block.querySelector('h3');
      return clean(h&&h.textContent).indexOf(label)>=0;
    });
  }

  function enrichCurrentOpl(){
    var modal=document.getElementById('termOplModal');
    var content=document.getElementById('termOplContent');
    if(!modal||!content||modal.hidden)return;
    var code=currentCode();
    if(!code)return;

    var caseBlock=findBlock(content,'制造现场案例');
    if(caseBlock&&SPECIFIC_CASES[code]&&caseBlock.getAttribute('data-qily-specific-case')!==VERSION){
      var heading=caseBlock.querySelector('h3');
      caseBlock.innerHTML=(heading?heading.outerHTML:'<h3>制造现场案例</h3>')+'<p class="term-opl-case"><strong>案例性质：教学推演。</strong> '+SPECIFIC_CASES[code]+'</p>';
      caseBlock.setAttribute('data-qily-specific-case',VERSION);
    }

    if(!content.querySelector('.qily-opl-relations')){
      var links=RELATIONS[code]||[
        ['/briefs/','精选简报｜相关工程判断'],
        ['/notes/','代表项目｜项目证据'],
        ['/methods/','相关项目能力']
      ];
      var relation=document.createElement('section');
      relation.className='qily-opl-relations';
      relation.setAttribute('data-qily-opl-relations',VERSION);
      relation.innerHTML='<h3>关联学习与交付｜Related Knowledge</h3><p>术语必须回到真实场景：统一口径 → 选择方法 → 案例验证 → 标准固化。以下入口与本课件同步关联。</p><div class="qily-opl-relation-grid">'+links.map(function(item){return '<a href="'+item[0]+'">'+item[1]+'</a>';}).join('')+'</div>';
      var contact=content.querySelector('.term-opl-contact-card');
      content.insertBefore(relation,contact||null);
    }
  }

  function ensureKnownCardCases(){
    Array.prototype.forEach.call(document.querySelectorAll('[data-term-card]'),function(card){
      if(card.querySelector('.term-case-mini'))return;
      var code=clean((card.querySelector('.term-code')||{}).textContent).toUpperCase();
      if(!SPECIFIC_CASES[code])return;
      var application=Array.prototype.find.call(card.querySelectorAll('p'),function(p){return clean(p.textContent).indexOf('应用场景')>=0;});
      if(!application)return;
      var caseLine=document.createElement('p');
      caseLine.className='term-case-mini';
      caseLine.innerHTML='<strong>应用案例：</strong>'+SPECIFIC_CASES[code];
      application.insertAdjacentElement('afterend',caseLine);
    });
  }

  function initialize(){
    ensureStyles();
    ensureSponsorCard();
    ensureKnownCardCases();
    enrichCurrentOpl();
    var modal=document.getElementById('termOplModal');
    if(modal&&window.MutationObserver){
      new MutationObserver(function(){
        requestAnimationFrame(function(){enrichCurrentOpl();});
      }).observe(modal,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['hidden']});
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();

