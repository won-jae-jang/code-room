const memberService = require("../service/memberService");

// 회원가입 기능
const register = async (req, res) => {
    try {
        console.log("")
        const { username, password } = req.body;
        const result = await memberService.register(username, password);
        res.json({ message: '회원 가입 완료', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 로그인 기능
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await memberService.login(username, password, req);
        res.json({ message: '로그인 성공', username: user.username });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// 로그아웃 기능
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: '로그아웃 실패' });
        }
        res.json({ message: '로그아웃 성공' });
    });
};

// 중복 확인 기능
const checkDuplicate = async (req, res) => {
    try {
        const username = req.body.username;
        console.log(username)
        const result = await memberService.checkDuplicate(username);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// 회원 정보 조회 기능
const info = async (req, res) => {
    try {
        // 세션에서 user_uid 추출
        const user_uid = req.session.user_uid;
        if (!user_uid) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }
        const user = await memberService.info(user_uid);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 비밀번호 변경 기능
const pwdChange = async (req, res) => {
    try {
        const user_uid = req.session.user_uid;
        if (!user_uid) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }
        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: '새로 입력한 두 비밀번호가 일치하지 않습니다.' });
        }
        const result = await memberService.modify(user_uid, currentPassword, newPassword);
        res.json({ message: '비밀번호 변경 완료', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// 회원 탈퇴 기능
const userdel = async (req, res) => {
    try {
        const user_uid = req.session.user_uid;
        if (!user_uid) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }
        const result = await memberService.userdel(user_uid);
        if (result) {
            res.json({ message: '회원 탈퇴가 완료되었습니다.' });
        } else {
            res.status(400).json({ message: '회원 탈퇴에 실패했습니다.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// 마이페이지 기능
const myPage = async (req, res) => {
    try {
        const user_uid = req.session.user_uid;
        if (!user_uid) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }
        const data = await memberService.myPage(user_uid);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { register, login, logout, info, pwdChange, userdel, myPage, checkDuplicate };

