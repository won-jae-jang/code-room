const memberRep = require("../repository/memberRepository");
const bcrypt = require("bcrypt");

// 회원가입 기능
const register = async (username, password) => {
    if (!username || !password) {
        throw new Error('사용자 이름과 비밀번호는 필수입니다.');
    }
    if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상이어야 합니다.');
    }
    const user = await memberRep.findUsername(username);
    if (user) throw new Error('이미 존재하는 아이디 입니다.');
    
    const hashedPassword = await bcrypt.hash(password, 8);
    await memberRep.register(username, hashedPassword);
};

// 로그인 기능
const login = async (username, password) => {
    const user = await memberRep.findUsername(username);
    if (!user) throw new Error('존재하지 않는 아이디 입니다.');

    const isMatch = await bcrypt.compare(password, user.pwd);
    if (!isMatch) throw new Error('비밀번호가 틀립니다.');

    return user; // 로그인 성공
};


// 회원 정보 조회 기능
const info = async (user_uid) => {
    const user = await memberRep.info(user_uid);
    if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
    }
    return user;
}

// 회원 정보 수정 기능
const modify = async(user_uid, currentPassword, newPassword) =>{
    const user = await memberRep.info(user_uid);
    if(!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.pwd);
    if(!isMatch) throw new Error('현재 비밀번호가 맞지 않습니다.');
    
    if (newPassword.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상이어야 합니다.');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await memberRep.modify(user_uid, hashedPassword);
}

// 회원 탈퇴 기능
const del = async (user_uid) => {
    await memberRep.del(user_uid);
}

// 마이페이지 기능 (사용자의 게시글과 댓글 정보 조회)
const myPage = async (user_uid) => {
    const posts = await memberRep.myPosts(user_uid);
    const comments = await memberRep.myComments(user_uid);
    return { posts, comments };
};


module.exports = { register, login, info, modify, del, myPage };