package com.revature.cafe.controller;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.cafe.beans.MenuItem;
import com.revature.cafe.services.MenuService;


@RestController
@RequestMapping(path="/menu")
@CrossOrigin(origins="*")
public class MenuController {


	private Logger log = Logger.getLogger(MenuController.class);
	
	@Autowired
	private MenuService ms;
	
	@GetMapping
	public ResponseEntity <Set<MenuItem>> getMenuItems() {
		Set<MenuItem> mss = ms.getMenuItems();
		log.trace(mss);
		return ResponseEntity.ok(mss);
	}
	
	@PostMapping
	public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem mi) {
		return ResponseEntity.ok(mi);
	}
	
	@PutMapping(value="{id}")
	public ResponseEntity<MenuItem> updateMenuItem(@PathVariable("id") int id, @RequestBody MenuItem mi) {
		log.trace("updated menu item");
		ms.updateMenuItem(mi);
		return ResponseEntity.ok(ms.getMenuItemById(id));
	}
	
	@DeleteMapping(value="{id}")
	public ResponseEntity<Void> deleteMenuItem(@PathVariable("id") int id) {
		ms.addMenuItem(ms.getMenuItemById(id)); //changed to delete because I don't think we need to delete menu items
		return ResponseEntity.noContent().build();
	}

}
