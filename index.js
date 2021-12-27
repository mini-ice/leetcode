import { resolve } from 'path'
import { existsSync, writeFileSync } from 'fs'
import process from 'process'
import chalk from 'chalk'
// import glob from 'glob'
import inquirer from 'inquirer'

const { cwd: _cwd } = process
const { prompt: _prompt } = inquirer

const prompt = [
  {
    name: 'mood',
    type: 'list',
    message: '今日心情',
    choices: ['😭', '😚', '🤪'],
  },
  {
    name: 'type',
    type: 'list',
    message: '文件目录：',
    choices: ['src', 'utils'],
    default: 'src',
  },
  {
    name: 'name',
    type: 'input',
    message: '文件名：',
    default: 'helloWorld',
  },
]

const overridePrompt = (fileName) => [
  {
    name: 'confirm',
    type: 'confirm',
    message: `是否替换${chalk.cyan(fileName)}文件`,
  },
]

const utilTemplate = (fileName) => `
/**
 * 
 */
function ${fileName}() {
  
}
export default ${fileName}
`

const funcTemplate = (fileName) => `
/**
 * ${new Date().toLocaleDateString()}
 * 
 */
function ${fileName}() {
  
}
${fileName}()
`

const template = (type, fileName) => (type === 'src' ? funcTemplate(fileName) : utilTemplate(fileName))

const cwd = _cwd()
// const targetDir = path.resolve(cwd, projectName)

async function create() {
  try {
    const { type, name } = await _prompt(prompt)
    const target = resolve(cwd, type, name + '.js')
    // const {}  = await
    if (existsSync(target)) {
      const { confirm } = await _prompt(overridePrompt(target))
      if (!confirm) throw { message: '您已拒绝替换' }
      writeFileSync(target, template(type, name))
    } else {
      writeFileSync(target, template(type, name))
    }
    // if()
  } catch (e) {
    console.error(chalk.red(e.message))
  }
}

create()
