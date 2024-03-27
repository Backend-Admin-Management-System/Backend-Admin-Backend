var express = require("express");
require("express-async-errors");
var router = express.Router();

const {body, query, param} = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

var courseCategoryController = require("../controller/coursecategorycontroller");

/**
 * @openapi
 * '/api/courseCategory/addCourseCategory':
 *  post:
 *     tags:
 *     - CourseCategory Controller
 *     summary: add course category
 *     description: add course category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - categoryname
 *              - categorylevel
 *              - categoryparentid
 *            properties:
 *              categoryname:
 *                type: string
 *                default: Node
 *              categorylevel:
 *                type: number
 *                default: 5
 *              categoryparentid:
 *                type: number
 *                default: 1
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.post(
    "/addCourseCategory",
    commonValidate([
        body("categoryname")
            .notEmpty()
            .withMessage("Not a valid category name"),
        body("categorylevel")
            .notEmpty()
            .isInt({allow_leading_zeroes:false, min:1})
            .withMessage("Not a valid category level"),
        body("categoryparentid")
            .notEmpty()
            .isInt({allow_leading_zeroes:false, min:1})
            .withMessage("Not a valid category parentid")
        ]),
    courseCategoryController.addCourseCategoryAsync
);

/**
 * @openapi
 * '/api/courseCategory/getCourseCategoryByName':
 *  get:
 *     tags:
 *     - CourseCategory Controller
 *     summary: get course category by category name
 *     description: get course category by category name
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: categoryname
 *        in: query
 *        description: Name of course category
 *        required: true
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.get(
    "/getCourseCategoryByName",
    commonValidate([
        query("categoryname").notEmpty().withMessage("Not Valid Category Name"),
    ]),
    courseCategoryController.getCourseCategoryByNameAysnc
);

/**
 * @openapi
 * '/api/courseCategory/getCourseCategoryById':
 *  get:
 *     tags:
 *     - CourseCategory Controller
 *     summary: get course category by category id
 *     description: get course category by category id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *      - name: id
 *        in: query
 *        description: id of course category
 *        required: true
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      409:
 *        description: Conflict
 *      500:
 *        description: Server Error
 */
router.get(
    "/getCourseCategoryById",
    commonValidate([
            query("id").notEmpty().withMessage("Not Valid Category Id"),
    ]),
    courseCategoryController.getCourseCategoryByIdAsync
);

module.exports = router;