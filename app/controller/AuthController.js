const { regionals, auditors, facilities,countries,statuses,auditypes,audits } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const facility = require('../models/facility');

module.exports = {

    signIn(req, res) {
        let { username, password } = req.body;
        if(req.params.usergroup === "regional"){
        regionals.findOne({
            where: {
                username: username
            },
           
           
        }).then(regional => {
            if (!regional) {
                res.status(404).json({ message: "Password Salah" });
            } else {
                if (bcrypt.compareSync(password, regional.password)) {
                    let token = jwt.sign({ regional: regional }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                     
                    res.json({
                        status: 200,
                        message:"SUCCESS",
                        data: regional,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Unauthorized Access" })
                }
            }
        }     
        ).catch(err => {
            res.status(500).json(err);
        })     
    }else if(req.params.usergroup === "auditor"){
        let { username, password } = req.body;
        auditors.findOne({
            where: {
                username: username
            }
        }).then(auditor => {
            if (!auditor) {
                res.status(404).json({ message: "Password Salah" });
            } else {
                if (bcrypt.compareSync(password, auditor.password)) {
                    let token = jwt.sign({ auditor: auditor }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        status: 200,
                        message:"SUCCESS",
                        data: auditor,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Unauthorized Access" })
                }
            }
        }     
        ).catch(err => {
            res.status(500).json(err);
        })
    }else if (req.params.usergroup === "facility"){
        let { username, password } = req.body;
        facilities.findOne({
            where: {
                username: username
            }
        }).then(facility => {
            if (!facility) {
                res.status(404).json({ message: "Password Salah" });
            } else {
                if (bcrypt.compareSync(password, facility.password)) {
                    let token = jwt.sign({ facility: facility }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        status: 200,
                        message:"SUCCESS",
                        data: facility,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Unauthorized Access" })
                }
            }
        }     
        ).catch(err => {
            res.status(500).json(err);
        })
    }else{
        res.status(404).json({ msg: "Not Fond" })
    }
    },

    signUpRegional(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        regionals.create({
            username: req.body.username,
            password: password,
            id_head : req.body.id_head
        }).then(regionals => {
            let token = jwt.sign({ regional: regionals }, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            res.json({
                regional : regionals,
                token: token,
            });

        }).catch(err => {
            res.status(500).json({
                msg: "Maaf Pastikan Data Yang Anda Masukan Benar"
        });
        });

    },

    signUpAuditor(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        auditors.create({
            username: req.body.username,
            password: password,
            id_lead : req.body.id_lead
        }).then(auditors => {

            let token = jwt.sign({ auditor: auditors }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                auditor: auditors,
                token: token,
            });

        }).catch(err => {
            res.status(500).json({
                msg: "Maaf Pastikan Data Yang Anda Masukan Benar"
        });
        });

    },

    
    signUpFacility(req, res) {
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        facilities.create({
            username: req.body.username,
            password: password,
            name_facility: req.body.name_facility,
            countryId : req.body.countri_id
        }).then(facilities => {

            let token = jwt.sign({ facility: facilities }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                facility: facilities,
                token: token,
            });

        }).catch(err => {
            res.status(500).json({
                msg: "Maaf Pastikan Role Yang Anda Masukan Benar"
        });
        });

    },




    // createRoles(req, res) {

    //     roles.create({
    //         name_role: req.body.name_role
    //     }).then(roles => {

    //         res.json({
    //             msg: "success",
    //             name_role: roles
    //         });

    //     }).catch(err => {
    //         res.status(500).json(err);
    //     });

        
    // },

    // createRegion(req, res) {
    //     regions.create({
    //         name_regoin: req.body.name_regoin
    //     }).then(regions => {
    //         res.json({
    //             msg: "success",
    //             name_region: regions
    //         });

    //     }).catch(err => {
    //         res.status(500).json({
    //             msg: "Maaf Pastikan Region Yang Anda Masukan Benar"
    //     });
    //     });
        
    // },


    // createBranch(req, res) {
    //     branches.create({
    //         name_branch: req.body.name_branch,
    //         regionId: req.body.regionId
    //     }).then(branches => {
    //         res.json({
    //             msg: "success",
    //             name_region: branches
    //         });

    //     }).catch(err => {
    //         res.status(500).json({
    //             msg: "Maaf Pastikan Region Yang Anda Masukan Benar"
    //     });
    //   });
    // },

    

    createStatus(req, res) {
        statuses.create({
            name_status: req.body.name_status
        }).then(statuses => {
            res.json({
                msg: "success",
                status: statuses
            });
        }).catch(err => {
            res.status(500).json({
                msg: "Sever Error"
        });
      });
    },


    createAuditType(req, res) {
        auditypes.create({
            name_audit: req.body.name_audit
        }).then(auditypes => {
            res.json({
                msg: "success",
                auditypes: auditypes
            });
        }).catch(err => {
            res.status(500).json({
                msg: "Sever Error"
        });
      });
    },

   

   





    verifyToken(req, res, next) {
		let tokenHeader = req.headers['x-access-token'];

		if (tokenHeader.split(' ')[0] !== 'Bearer') {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Incorrect token format"
			});
		}

		let token = tokenHeader.split(' ')[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}

		jwt.verify(token, authConfig.secret, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: err
				});
			}
            res.json({
                user: decoded.user.roleId,
                
            });
		});
	},

}