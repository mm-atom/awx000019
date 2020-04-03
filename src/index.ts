import awx8 from '@mmstudio/awx000002';

export default async function take_photo(fd: awx8, quality?: 'high' | 'normal' | 'low') {
	const ctx = await get_ctx(fd);
	if (!ctx) {
		return null;
	}
	return new Promise<string | null>((resolve) => {
		ctx.takePhoto({
			quality,
			success(res) {
				resolve(res.tempImagePath);
			},
			fail() {
				resolve(null);
			}
		});
	});
}

async function get_ctx(mm: awx8) {
	if (!mm.data.mm.camera_context) {
		if (!await authorize()) {
			return null;
		}
		mm.data.mm.camera_context = wx.createCameraContext();
	}
	return mm.data.mm.camera_context;
}

function authorize() {
	return new Promise<boolean>((resolve) => {
		wx.authorize({
			scope: 'scope.camera',
			success() {
				resolve(true);
			},
			fail() {
				resolve(false);
			}
		});
	});
}
