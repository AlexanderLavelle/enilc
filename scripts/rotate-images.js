const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const iconsDir = path.join(__dirname, "../assets/icons")

const imagesToRotate = ["icon.png", "robot_panel_dark.png", "robot_panel_light.png"]

async function rotateImages() {
	for (const imageName of imagesToRotate) {
		const imagePath = path.join(iconsDir, imageName)
		const tempPath = path.join(iconsDir, `temp_${imageName}`)

		try {
			await sharp(imagePath).rotate(180).toFile(tempPath)

			fs.renameSync(tempPath, imagePath)
			console.log(`Rotated ${imageName}`)
		} catch (error) {
			console.error(`Error rotating ${imageName}:`, error)
			if (fs.existsSync(tempPath)) {
				fs.unlinkSync(tempPath)
			}
		}
	}
}

rotateImages()
