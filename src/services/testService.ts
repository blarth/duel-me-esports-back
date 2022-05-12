import { recommendationRepository } from "../repositories/recommendationRepository.js"


export async function resetDatabase(){
    await recommendationRepository.truncate();
}

