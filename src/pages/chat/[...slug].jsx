import React from "react";
import Chat from "../../container/Chat";
import { useRouter } from "next/router";
import RatingContainer from "../../container/Chat/Rating";

const ChatPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Chat slug={slug?.length ? slug[0] : null}>
        {slug?.length ? slug[0] === "rating" ? <RatingContainer /> : null : null}
      </Chat>
    </>
  );
};

export default ChatPage;
