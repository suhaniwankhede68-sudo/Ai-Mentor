import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers       = await User.count();
    const activeCourses    = await Course.count({ where: { status: 'active' } });
    const totalRevenue     = await Enrollment.sum('amount') || 0;
    const totalEnrollments = await Enrollment.count();
    const instructors      = await User.count({ where: { role: 'instructor' } });

    res.json({
      totalUsers,
      activeCourses,
      totalRevenue,
      totalEnrollments,
      instructors,
      completionRate: 74.6,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    const data = enrollments.map(e => ({
      ...e.toJSON(),
      amount: e.amount || 1999,
    }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRevenueTrend = async (req, res) => {
  try {
    const data = [
      { month: 'Jan', amount: 48200  },
      { month: 'Feb', amount: 61500  },
      { month: 'Mar', amount: 284500 },
      { month: 'Apr', amount: 95000  },
      { month: 'May', amount: 120000 },
      { month: 'Jun', amount: 175000 },
    ];
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      order: [['students', 'DESC']],
      limit: 5,
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};