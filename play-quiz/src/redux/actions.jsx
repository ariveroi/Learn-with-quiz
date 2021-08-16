export const CHECK_QUIZ = 'CHECK_QUIZ'

export function checkQuiz(accessId) {
    return{
        type: CHECK_QUIZ,
        payload: {accessId}
    }
}