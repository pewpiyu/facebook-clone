import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/client";
import Image from "next/image";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase";

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const imageRef = useRef(null);
  const [uploadedImg, setImage] = useState(null);

  function sendPost(e) {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (uploadedImg) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(uploadedImg, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              //when the upload completes
              storage
                .ref(`posts/${doc.id}`) //
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
  }

  function addImage(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  }
  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="bg-white p-2 mt-6 rounded-2xl shadow-md text-gray-500 font-medium">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            type="text"
            className="rounded-full h-12 flex-grow bg-gray-100 px-5 outline-none sm:mr-4"
            placeholder={`What's on your mind, ${session.user.name} ?`}
          />

          <button type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {uploadedImg && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={uploadedImg} alt="" />
            <p className="text-red-500 text-center">remove</p>
          </div>
        )}
      </div>

      <div
        className="flex justify-evenly p-3 border-t
      "
      >
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div onClick={() => imageRef.current.click()} className="inputIcon">
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input ref={imageRef} onChange={addImage} type="file" hidden />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
