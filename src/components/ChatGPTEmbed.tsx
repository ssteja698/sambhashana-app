import React, { useState } from "react";
import { FiCopy, FiExternalLink, FiCheck, FiClipboard } from "react-icons/fi";
import type { Lesson } from "../services/LessonScheduler";
import { copyToClipboard } from "../utils/promptCopier";

interface ChatGPTEmbedProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const ChatGPTEmbed: React.FC<ChatGPTEmbedProps> = ({
  lesson,
  onComplete,
}) => {
  const [copied, setCopied] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleCopyAndOpen = async () => {
    const success = await copyToClipboard(lesson.prompt || "");
    setCopied(success);
    setTimeout(() => setCopied(false), 2000);
    window.open("https://chat.openai.com/chat", "_blank");
    setOpened(true);
  };

  return (
    <div className="max-w-full lg:max-w-4xl mx-auto p-2 lg:p-6">
      <div className="lesson-card rounded-xl lg:rounded-2xl p-3 lg:p-6">
        <h2 className="text-lg lg:text-xl font-bold mb-4 telugu-text">
          ChatGPT పాఠం | ChatGPT Lesson
        </h2>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 lg:p-4 mb-4 lg:mb-6">
          <p className="text-blue-800 text-base lg:text-sm telugu-text">
            మీరు OpenAI ఖాతాలో లాగిన్ అవ్వవలసిన అవసరం లేదు. మీరు ఇప్పటికే లాగిన్
            అయినట్లయితే, మీ ప్రోగ్రెస్ సజావుగా కొనసాగుతుంది.
          </p>
          <p className="text-blue-700 text-base lg:text-sm mt-2">
            You don't need to log in to OpenAI to use ChatGPT. If you're already
            logged in, your progress will continue seamlessly.
          </p>
        </div>

        {/* Prompt Section */}
        <div className="mb-4 lg:mb-6">
          <h3 className="text-base lg:text-lg font-medium mb-2 lg:mb-3 telugu-text">
            నేటి పాఠ ప్రాంప్ట్ | Today's Lesson Prompt
          </h3>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 lg:p-4">
            <p className="text-gray-800 mb-3 telugu-text text-base lg:text-lg">
              {lesson.prompt || "No prompt available for this lesson."}
            </p>
            {/* Engagement Checklist/Instructions */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-3 animate-fade-in">
              <h4 className="text-base lg:text-lg font-semibold text-green-800 mb-2 telugu-text">
                ✅ మీరు ఇప్పుడు చేయాల్సింది:
              </h4>
              <ul className="list-disc pl-5 text-green-700 text-base lg:text-lg telugu-text space-y-1">
                <li>
                  ChatGPT ట్యాబ్‌లో ప్రాంప్ట్ పేస్ట్ చేయండి (Paste the prompt in
                  ChatGPT)
                </li>
                <li>సంభాషణ ప్రారంభించండి (Start your conversation)</li>
                <li>
                  మీరు పూర్తయ్యాక ఈ పేజీకి తిరిగి రండి (Return here when done)
                </li>
                <li>
                  "పాఠం పూర్తి చేయండి" బటన్ క్లిక్ చేయండి (Click "Mark Lesson
                  Complete")
                </li>
              </ul>
              <p className="text-green-700 text-sm mt-2 telugu-text">
                మీరు ChatGPT లో మాట్లాడిన ప్రతిసారీ మీరు మరింత నమ్మకంగా మారతారు!
                👍
              </p>
            </div>
            {/* Note about embedding restriction */}
            <p className="text-xs text-gray-500 mb-3 text-center">
              ChatGPT cannot be embedded due to security restrictions. Use the
              button below to open ChatGPT in a new tab. Paste the prompt and
              start chatting!
            </p>
            <button
              onClick={handleCopyAndOpen}
              className="flex items-center gap-2 px-4 py-3 w-full lg:w-auto bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-200 text-base lg:text-lg font-medium shadow-sm justify-center"
            >
              {copied ? (
                <>
                  <FiCheck className="w-5 h-5" />
                  <span className="telugu-text">
                    ప్రాంప్ట్ కాపీ అయింది! | Prompt Copied!
                  </span>
                </>
              ) : (
                <>
                  <FiClipboard className="w-5 h-5" />
                  <span className="telugu-text">
                    ప్రాంప్ట్ కాపీ చేసి ChatGPT తెరవండి | Copy Prompt & Open
                    ChatGPT
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Complete Lesson Button */}
        <div className="text-center mt-4">
          <button
            onClick={onComplete}
            className="secondary-button w-full lg:w-auto py-3 px-6 text-base lg:text-lg rounded-xl transition-all duration-200"
          >
            పాఠం పూర్తి చేయండి | Mark Lesson Complete
          </button>
        </div>
      </div>
    </div>
  );
};
