import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";
import * as webp from 'webp-converter'
import * as fs from 'fs'

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    throw new HttpException('Only image files are allowed!', HttpStatus.CONFLICT)
  }
  callback(null, true);
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0].replace(/[^a-zа-яё0-9\s]/gi, '').split(' ').join('')
  const fileExtName = extname(file.originalname)
  const prefix = (Math.random() * Math.pow(36, 6) | 0).toString(36)
  callback(null, `${name}-${prefix}${fileExtName}`)
}

export const convertingFormatFiles = async (photos : Express.Multer.File[]): Promise<Express.Multer.File[]> => {
  if (photos && photos.length) {
    for (const photo of photos) {
      await webp.cwebp(photo.path, `${photo.path.split('.')[0]}.webp`, '-q 80')
      fs.unlinkSync(photo.path)
      photo.path = (`${photo.path.split('.')[0]}.webp`).replace(/\\/g, '/')
      photo.filename = photo.filename.split('.')[0]+'.webp'
      
    }
  }
  
  return photos
}

export const convertingFormatFile = async (photo: Express.Multer.File): Promise<Express.Multer.File> => {
  if (photo) {
    await webp.cwebp(photo.path, `${photo.path.split('.')[0]}.webp`, '-q 80')
    fs.unlinkSync(photo.path)
    photo.path = (`${photo.path.split('.')[0]}.webp`).replace(/\\/g, '/')
    photo.filename = photo.filename.split('.')[0]+'.webp'
  }

  return photo
}
