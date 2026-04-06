
        ffmpeg_command = (
            f'ffmpeg -y -stream_loop -1 -i "{input_video}" '
            f'-i "{audio_path}" '
            f'-map 0:v:0 -map 1:a:0 '
            f'-c:v copy -c:a aac -shortest "{final_video}"'
        )

        print(f"🎥 Running ffmpeg command...")
        os.system(ffmpeg_command)

        if not os.path.exists(final_video):
            print(f"❌ FFmpeg failed — video file not found at {final_video}")
            job_status[base_filename] = {"status": "failed"}
            return

        # 7️⃣ Upload to Cloudinary
        cloudinary_url = None
        try:
            print(f"☁️ Uploading video to Cloudinary...")
            upload_result = cloudinary.uploader.upload(
                final_video,
                resource_type="video",
                folder="ai_mentor/videos",
                public_id=base_filename,
                overwrite=True,
                chunk_size=6000000,  # 6 MB chunks for large files
            )
            cloudinary_url = upload_result.get("secure_url")
            print(f"✅ Cloudinary upload success: {cloudinary_url}")
        except Exception as cloud_err:
            print(f"⚠️ Cloudinary upload failed (will fall back to local proxy): {cloud_err}")

        job_status[base_filename] = {
            "status": "ready",
            "cloudinary_url": cloudinary_url,  # None if upload failed
        }
        print(f"✅ Lesson ready!")
        print(f"   Video : {final_video}")
        if cloudinary_url:
            print(f"   Cloud : {cloudinary_url}")

    except Exception as e:
        job_status[base_filename] = {"status": "failed"}  # 👈 mark failed on error
        print(f"❌ Error generating lesson: {e}")
        traceback.print_exc()
