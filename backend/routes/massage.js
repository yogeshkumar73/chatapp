useEffect(() => {
  socket.on("receive_message", (data: Message) => {
    setChat((prev: Message[]) => [...prev, data]);
  });

  return () => {
    socket.off("receive_message");
  };
}, []);