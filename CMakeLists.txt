cmake_minimum_required(VERSION 3.0.0)
project(ping-them-all LANGUAGES NONE)

set(SOURCE
   bin/pta
   src/pta.js
   src/targets/alibaba.json
   src/targets/aws.json
   src/targets/debianBig.json
   src/targets/debianSmall.json
   src/targets/digitalocean.json
   src/targets/google.json
   src/targets/ovh.json
)

set(OTHER
   .gitignore
   .jshintrc
   package.json
   README.md
   LICENSE.md
)

add_custom_target(${PROJECT_NAME}_npm ALL
    COMMAND npm install
    WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}
    DEPENDS package.json
    SOURCES package.json)

add_custom_target(${PROJECT_NAME}_jsbeautify ALL
    COMMAND node node_modules/js-beautify/js/bin/js-beautify.js -r -q ${SOURCE}
    WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}
    DEPENDS ${SOURCE} ${PROJECT_NAME}_npm
    SOURCES ${SOURCE})

add_custom_target(${PROJECT_NAME}_jshint ALL
    COMMAND node node_modules/jshint/bin/jshint ${SOURCE}
    WORKING_DIRECTORY ${CMAKE_CURRENT_LIST_DIR}
    DEPENDS ${SOURCE} ${PROJECT_NAME}_jsbeautify
    SOURCES ${SOURCE})

add_custom_target(${PROJECT_NAME}_IDE ALL SOURCES ${OTHER})
