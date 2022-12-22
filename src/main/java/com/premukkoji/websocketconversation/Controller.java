package com.premukkoji.websocketconversation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Slf4j
@org.springframework.stereotype.Controller
public class Controller {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chatroom-message")
    @SendTo("/chatroom/public")
    public String sendMessage(@Payload String message){
        log.info("Received message from Client : " + message);
        return "Springboot : Hello, I've received this message from you -> " + message;
    }

    @MessageMapping("/private-message")
    public Message sendPrivateMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        return message;
    }

}
