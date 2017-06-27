<?php

function myBartik_libraries_info() {
  // Paths are relative to the individual library's directory
  // sites/all/libraries/LIBRARY
  $libraries['slick'] = array(
    'name' => 'Slick',
    // Version callback is required, can just return TRUE in callback if unconcerned about library version
    'version callback' => 'short_circuit_version',
    'files' => array(
    // Located at: sites/all/libraries/slick/slick/slick.min.js
    // Careful of the two nested 'slick' directories
      'js' => array('slick/slick.min.js'),
      'css' => array('slick/slick.css'),
    ),
  );

  return $libraries;
}

/**
* Short-circuit the version argument.
*/
function short_circuit_version() {
  return TRUE;
}

function myBartik_preprocess_page(&$variables) {
  //Include files based on content type
  if (isset($variables['node']->type) && !empty($variables['node']->type) && ($variables['node']->type == 'article')){
    // Load 'Slick' carousel library on blog pages
    libraries_load('slick');
  }

  if (isset($variables['node'])) {
    // If the node type is "article" the template suggestion will be "page--article.tpl.php".
    $variables['theme_hook_suggestions'][] = 'page__'. str_replace('_', '__', $variables['node']->type);
  }
}
