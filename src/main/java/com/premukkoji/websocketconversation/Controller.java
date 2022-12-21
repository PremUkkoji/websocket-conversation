package com.premukkoji.websocketconversation;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;

@Slf4j
@org.springframework.stereotype.Controller
public class Controller {

    @MessageMapping("/interact")
    @SendTo("/topic/conversations")
    public String sendMessage(String message){
        log.info("Received message from Client : " + message);
        return "Springboot : Hello, I've received this message from you -> " + message;
    }

}
