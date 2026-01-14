import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["assets/css/common.css","assets/css/common.css.map","assets/css/jquery-ui.css","assets/css/reset.css","assets/font/icomoon/demo-files/demo.css","assets/font/icomoon/demo-files/demo.js","assets/font/icomoon/demo.html","assets/font/icomoon/fonts/icomoon.eot","assets/font/icomoon/fonts/icomoon.svg","assets/font/icomoon/fonts/icomoon.ttf","assets/font/icomoon/fonts/icomoon.woff","assets/font/icomoon/Read Me.txt","assets/font/icomoon/selection.json","assets/font/icomoon/style.css","assets/font/pretendard.css","assets/font/woff/Pretendard-Black.woff","assets/font/woff/Pretendard-Bold.woff","assets/font/woff/Pretendard-ExtraBold.woff","assets/font/woff/Pretendard-ExtraLight.woff","assets/font/woff/Pretendard-Light.woff","assets/font/woff/Pretendard-Medium.woff","assets/font/woff/Pretendard-Regular.woff","assets/font/woff/Pretendard-SemiBold.woff","assets/font/woff/Pretendard-Thin.woff","assets/font/woff2/Pretendard-Black.woff2","assets/font/woff2/Pretendard-Bold.woff2","assets/font/woff2/Pretendard-ExtraBold.woff2","assets/font/woff2/Pretendard-ExtraLight.woff2","assets/font/woff2/Pretendard-Light.woff2","assets/font/woff2/Pretendard-Medium.woff2","assets/font/woff2/Pretendard-Regular.woff2","assets/font/woff2/Pretendard-SemiBold.woff2","assets/font/woff2/Pretendard-Thin.woff2","assets/font/XEIcon/fonts/xeicon.eot","assets/font/XEIcon/fonts/xeicon.svg","assets/font/XEIcon/fonts/xeicon.ttf","assets/font/XEIcon/fonts/xeicon.woff","assets/font/XEIcon/fonts/xeicon.woff2","assets/font/XEIcon/xeicon.css","assets/font/XEIcon/xeicon.min.css","assets/img/admin_bg.jpg","assets/img/barodoctorKR_txt.png","assets/img/checkbox_off.svg","assets/img/checkbox_on.svg","assets/img/ex_doctor1.png","assets/img/ex_doctor2.jpg","assets/img/ex_doctor3.jpg","assets/img/icon_arrow2.svg","assets/img/icon_arrow3.svg","assets/img/icon_cla.svg","assets/img/icon_close.svg","assets/img/icon_h_arrow.svg","assets/img/icon_h_ex.svg","assets/img/icon_h_mic.svg","assets/img/icon_h_video.svg","assets/img/icon_search.svg","assets/img/icon_setting.svg","assets/img/images/ui-icons_444444_256x240.png","assets/img/images/ui-icons_555555_256x240.png","assets/img/images/ui-icons_777620_256x240.png","assets/img/images/ui-icons_777777_256x240.png","assets/img/images/ui-icons_cc0000_256x240.png","assets/img/images/ui-icons_ffffff_256x240.png","assets/img/logo.svg","assets/img/logo4.png","assets/img/logo_c.svg","assets/img/main.svg","assets/img/main_slide_bg1.png","assets/img/mbtn_00.svg","assets/img/mbtn_01.svg","assets/img/mbtn_02.svg","assets/img/mbtn_03.svg","assets/img/mbtn_04.svg","assets/img/mbtn_05.svg","assets/img/mbtn_06.svg","assets/img/mbtn_07.svg","assets/img/mbtn_08.svg","assets/img/mbtn_09.svg","assets/img/namwon.png","assets/img/namwonLogo.png","assets/img/nav/barodoctor_logo.png","assets/img/nav/bitcampus_banner.png","assets/img/nav/bitcampus_banner2.png","assets/img/nav/bitcampus_banner3.png","assets/img/nav/bitcampus_banner4.png","assets/img/nav/bitcampus_banner5.png","assets/img/res_btn.svg","assets/inc/footer.html","assets/inc/header.html","assets/inc/headin.html","assets/js/common.js","assets/js/html5shiv.min.js","assets/js/jquery-1.10.2.min.js","assets/js/jquery-3.3.1.min.js","assets/js/jquery-ui.js","assets/js/jquery.bxslider.min.js","assets/js/jquery.sticky.js","assets/js/menu.js","assets/js/placeholders.min.js","assets/js/prefixfree.min.js","assets/realgrid/assets/calendar_down.png","assets/realgrid/assets/calendar_hover.png","assets/realgrid/assets/calendar_up.png","assets/realgrid/assets/cal_down.png","assets/realgrid/assets/cal_down_active.png","assets/realgrid/assets/cal_down_hover.png","assets/realgrid/assets/cal_next.png","assets/realgrid/assets/cal_next_active.png","assets/realgrid/assets/cal_next_hover.png","assets/realgrid/assets/cal_prev.png","assets/realgrid/assets/cal_prev_active.png","assets/realgrid/assets/cal_prev_hover.png","assets/realgrid/assets/cal_up.png","assets/realgrid/assets/cal_up_active.png","assets/realgrid/assets/cal_up_hover.png","assets/realgrid/assets/dropdown_down.png","assets/realgrid/assets/dropdown_hover.png","assets/realgrid/assets/dropdown_up.png","assets/realgrid/assets/ellipsis_down.png","assets/realgrid/assets/ellipsis_hover.png","assets/realgrid/assets/ellipsis_up.png","assets/realgrid/assets/error_error.png","assets/realgrid/assets/error_info.png","assets/realgrid/assets/error_warning.png","assets/realgrid/assets/indicator_arrow.png","assets/realgrid/assets/indicator_edit.png","assets/realgrid/assets/indicator_foot.png","assets/realgrid/assets/indicator_insert.png","assets/realgrid/assets/menu_check.png","assets/realgrid/assets/menu_expander.png","assets/realgrid/assets/menu_radio.png","assets/realgrid/assets/rate_star_off.png","assets/realgrid/assets/rate_star_on.png","assets/realgrid/assets/realgridplus.png","assets/realgrid/jszip.min.js","assets/realgrid/realgridjs-api.1.1.43.js","assets/realgrid/realgridjs-lic.js","assets/realgrid/realgridjs_eval.1.1.43.min.js","assets/scss/common.scss","favicon.ico","favicon.png"]),
	mimeTypes: {".css":"text/css",".map":"application/json",".js":"application/javascript",".html":"text/html",".svg":"image/svg+xml",".ttf":"font/ttf",".woff":"font/woff",".txt":"text/plain",".json":"application/json",".woff2":"font/woff2",".jpg":"image/jpeg",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.ffee4dc4.js","app":"_app/immutable/entry/app.315ec6e2.js","imports":["_app/immutable/entry/start.ffee4dc4.js","_app/immutable/chunks/index.d5a12835.js","_app/immutable/chunks/singletons.9a8df68d.js","_app/immutable/chunks/paths.89d88102.js","_app/immutable/entry/app.315ec6e2.js","_app/immutable/chunks/index.d5a12835.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js')),
			__memo(() => import('../server/nodes/14.js')),
			__memo(() => import('../server/nodes/15.js')),
			__memo(() => import('../server/nodes/16.js')),
			__memo(() => import('../server/nodes/17.js')),
			__memo(() => import('../server/nodes/18.js')),
			__memo(() => import('../server/nodes/19.js')),
			__memo(() => import('../server/nodes/20.js')),
			__memo(() => import('../server/nodes/21.js')),
			__memo(() => import('../server/nodes/22.js')),
			__memo(() => import('../server/nodes/23.js')),
			__memo(() => import('../server/nodes/24.js')),
			__memo(() => import('../server/nodes/25.js')),
			__memo(() => import('../server/nodes/26.js')),
			__memo(() => import('../server/nodes/27.js')),
			__memo(() => import('../server/nodes/28.js')),
			__memo(() => import('../server/nodes/29.js')),
			__memo(() => import('../server/nodes/30.js')),
			__memo(() => import('../server/nodes/31.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/adjmt/awAdjmDtlLst",
				pattern: /^\/adjmt\/awAdjmDtlLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/adjmt/awAdjmtLst",
				pattern: /^\/adjmt\/awAdjmtLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/adjmt/awPayLst",
				pattern: /^\/adjmt\/awPayLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/auth/awChngPw",
				pattern: /^\/auth\/awChngPw\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/auth/awLogin",
				pattern: /^\/auth\/awLogin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/board/awShpNtcLst",
				pattern: /^\/board\/awShpNtcLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/cmm/awNtcLst",
				pattern: /^\/cmm\/awNtcLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/drst/awPspnDtl",
				pattern: /^\/drst\/awPspnDtl\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/drst/awPspnLst",
				pattern: /^\/drst\/awPspnLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/hspt/awDgnsEnt",
				pattern: /^\/hspt\/awDgnsEnt\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/hspt/awDgnsRcpt",
				pattern: /^\/hspt\/awDgnsRcpt\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/hspt/awDgnsRsvLst",
				pattern: /^\/hspt\/awDgnsRsvLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/login/awCheckJoin",
				pattern: /^\/login\/awCheckJoin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/login/awCheckPw",
				pattern: /^\/login\/awCheckPw\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/login/awChngPw",
				pattern: /^\/login\/awChngPw\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/login/awFindID",
				pattern: /^\/login\/awFindID\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/login/awJoin",
				pattern: /^\/login\/awJoin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/login/awLogin",
				pattern: /^\/login\/awLogin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/main/main",
				pattern: /^\/main\/main\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/publish/adjmt/awPayLst",
				pattern: /^\/publish\/adjmt\/awPayLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/publish/cmm/awNtcLst",
				pattern: /^\/publish\/cmm\/awNtcLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/publish/hspt/awDgnsRcpt",
				pattern: /^\/publish\/hspt\/awDgnsRcpt\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/publish/hspt/awDgnsRsvLst",
				pattern: /^\/publish\/hspt\/awDgnsRsvLst\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/publish/main/main",
				pattern: /^\/publish\/main\/main\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/publish/shp/awHsptDtl",
				pattern: /^\/publish\/shp\/awHsptDtl\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/shp/awDrstDtl",
				pattern: /^\/shp\/awDrstDtl\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/shp/awHoliday",
				pattern: /^\/shp\/awHoliday\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/shp/awHsptDtl",
				pattern: /^\/shp\/awHsptDtl\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/welcome",
				pattern: /^\/welcome\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
